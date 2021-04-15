const axios = require("axios");
const process = require("process");
const { Buffer } = require("buffer");
const { Fauna } = require("./fauna_utils");
const IS_SANDBOX = false;

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

  async createCardCharge(charge, billing) {
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
      await this.fauna.recordCharge({
        chargeCode: recordedCharge.code,
        email: billing.email,
        name: billing.name,
        amount: charge.amount,
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

  async createPixCharge(charge, billing) {
    const body = {
      devedor: {
        cpf: billing.document,
        nome: billing.name,
      },
      valor: {
        original: charge.amount + ".00",
      },
      chave: getFromEnv("PIX_KEY", IS_SANDBOX),
      solicitacaoPagador: charge.description,
    };

    try {
      // Create charge
      const response = await this.api.post("/pix-api/v2/cob", body, {
        headers: this.headers,
      });

      // Fetch qrcode
      const txid = response.data.txid;
      const qrResponse = await this.api.get(
        "/pix-api/qrcode/v2/" + txid + "/imagem",
        {
          headers: this.headers,
        }
      );

      // Save charge to FaunaDB with temporary pix code
      await this.fauna.recordCharge({
        pixCode: txid,
        email: billing.email,
        name: billing.name,
        amount: charge.amount,
        paymentType: "PIX",
        status: "PENDING",
      });

      return { ...qrResponse.data, txid };
    } catch (e) {
      console.log("Failed to create charge!");
      console.log(e.response.data);
      return null;
    }
  }
}

module.exports = { Juno };
