const axios = require("axios");

function getFromEnv(variable, useSandbox) {
  if (useSandbox) {
    return process.env["SANDBOX_" + variable];
  }

  return process.env[variable];
}

function getClientHash(clientId, clientSecret) {
  var data = clientId + ":" + clientSecret;
  var buff = Buffer.from(data);
  return buff.toString("base64");
}

async function getAccessToken(clientId, clientSecret, isSandbox) {
  const hash = getClientHash(clientId, clientSecret);
  const { data, status } = await axios.post(
    isSandbox
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
    return null;
  }

  return data.access_token;
}

async function createCharge(
  accessToken,
  resourceToken,
  charge,
  billing,
  isSandbox
) {
  const headers = {
    "X-Api-Version": 2,
    "X-Resource-Token": resourceToken,
    Authorization: `Bearer ${accessToken}`,
  };

  const body = {
    charge,
    billing,
  };

  const baseUrl = isSandbox
    ? "https://sandbox.boletobancario.com/api-integration"
    : "https://api.juno.com.br";

  try {
    const { data } = await axios.post(baseUrl + "/charges", body, {
      headers,
    });
    return data._embedded.charges;
  } catch (e) {
    console.log("Failed to create charge!");
    console.log(e.response.data);
    return null;
  }
}

async function processCharge(
  accessToken,
  resourceToken,
  chargeId,
  creditCardHash,
  email,
  isSandbox
) {
  const headers = {
    "X-Api-Version": 2,
    "X-Resource-Token": resourceToken,
    Authorization: `Bearer ${accessToken}`,
  };

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

  const baseUrl = isSandbox
    ? "https://sandbox.boletobancario.com/api-integration"
    : "https://api.juno.com.br";

  try {
    const { data } = await axios.post(baseUrl + "/payments", body, {
      headers,
    });
    return null;
  } catch (e) {
    return e.response.data.details[0].errorCode;
  }
}

module.exports = { getFromEnv, getAccessToken, createCharge, processCharge };
