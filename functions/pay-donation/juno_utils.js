const axios = require("axios");
const { Fauna } = require("./fauna_utils");
const IS_SANDBOX = true;

function getFromEnv(variable, useSandbox) {
  if (useSandbox) {
    return process.env["SANDBOX_" + variable];
  }

  return process.env[variable];
}

class Juno {
  constructor() {
    this.api = axios.create({
      baseURL: IS_SANDBOX
        ? "https://sandbox.boletobancario.com/api-integration"
        : "https://api.juno.com.br",
    });

    this.fauna = new Fauna();
  }

  async initHeaders() {
    // Produce access hash
    const hash = Buffer.from(
      getFromEnv("CLIENT_ID", IS_SANDBOX) +
        ":" +
        getFromEnv("CLIENT_SECRET", IS_SANDBOX)
    ).toString("base64");

    // Acquire access token
    const { data, status } = await axios.post(
      IS_SANDBOX
        ? "https://sandbox.boletobancario.com/authorization-server/oauth/token"
        : "https://api.juno.com.br/authorization-server/oauth/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${hash}`,
        },
      }
    );

    if (status !== 200) {
      console.log("Authorization error: " + status);
      return;
    }

    // Set headers
    this.headers = {
      "X-Api-Version": 2,
      "X-Resource-Token": getFromEnv("PRIVATE_TOKEN", IS_SANDBOX),
      Authorization: `Bearer ${data.access_token}`,
    };
  }

  async createCharge(charge, billing) {
    try {
      const { data } = await this.api.post(
        "/charges",
        { charge, billing },
        {
          headers: this.headers,
        }
      );

      const recordedCharge = data._embedded.charges[0];

      // Save charge to FaunaDB
      this.fauna.recordCharge({
        chargeCode: recordedCharge.code,
        email: billing.email,
        name: billing.name,
        amount: charge.amount,
        description: charge.description,
        paymentType: charge.paymentTypes[0],
        status: "PENDING",
      });

      return recordedCharge;
    } catch (e) {
      console.log("Failed to create charge!");
      console.log(e.response.data);
      return null;
    }
  }

  async processCharge(chargeId, chargeCode, creditCardHash, email) {
    const body = {
      chargeId,
      creditCardDetails: { creditCardHash },
      billing: {
        email,
        address: {
          street: "Rua Padre Benedito de Camargo",
          number: "356",
          city: "São Paulo",
          state: "SP",
          postCode: "03604010",
        },
      },
    };

    try {
      await this.api.post("/payments", body, {
        headers: this.headers,
      });
    } catch (e) {
      const error = e.response.data.details[0].errorCode;

      // Record charge as rejected
      if (error == 289999) {
        await this.fauna.updateCharge(chargeCode, "DENIED");
      }

      return error;
    }
  }

  async fetchCharge(chargeCode) {
    // Grab date to filter charges
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const yesterday = date.toISOString().split("T")[0];

    try {
      const { data } = await this.api.get(
        "/charges?createdOnStart=" + yesterday,
        {},
        {
          headers: this.headers,
        }
      );
      console.log(data);
    } catch (e) {
      console.log("oops!");
      console.log(e.response.details);
    }
  }
}

module.exports = { Juno };
