const validator = require("validator");
const {
  getAccessToken,
  createCharge,
  processCharge,
  getFromEnv,
} = require("./juno_utils");

const USE_SANDBOX = true;

function checkCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "") return false;
  if (cpf.length !== 11) return false;

  let sum;
  let remainder;
  sum = 0;
  cpf = cpf.replace(/[^\d]+/g, "");

  if (
    // Reject known invalid CPFs
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999" ||
    cpf === "00000000000"
  )
    return false;

  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10), 10)) return false;
  sum = 0;

  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11), 10)) return false;

  return true;
}

function sanitize(body) {
  return {
    name: validator.escape(body.name),
    email: validator.escape(body.email),
    phone: validator.escape(body.phone),
    cpf: validator.escape(body.cpf.replace(/[.-]/g, "")),
    cardHash: validator.escape(body.cardHash),
    total: validator.escape(body.total + ""),
    description: validator.escape(body.description),
  };
}

function fieldsAreValid(body) {
  if (!validator.isAlpha(body.name, "pt-BR", { ignore: " " })) {
    return false;
  }

  if (!validator.isEmail(body.email)) {
    return false;
  }

  if (!checkCPF(body.cpf)) {
    return false;
  }

  if (!validator.isMobilePhone(body.phone, "pt-BR")) {
    return false;
  }

  if (!validator.matches(body.cardHash, /[a-zA-Z0-9-]+/)) {
    return false;
  }

  if (!validator.isInt(body.total)) {
    return false;
  }

  return true;
}

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = sanitize(JSON.parse(event.body));
  const bodyIsValid = fieldsAreValid(body);
  if (!bodyIsValid) {
    return { statusCode: 400 };
  }

  // Acquire Juno token
  const token = await getAccessToken(
    getFromEnv("CLIENT_ID", USE_SANDBOX),
    getFromEnv("CLIENT_SECRET", USE_SANDBOX),
    USE_SANDBOX
  );

  // Create charge
  const billing = {
    name: body.name,
    document: body.cpf,
    email: body.email,
    phone: body.phone,
  };

  const charge = {
    paymentTypes: ["CREDIT_CARD"],
    installments: 1,
    amount: body.total,
    description: body.description,
  };

  const charges = await createCharge(
    token,
    getFromEnv("PRIVATE_TOKEN", USE_SANDBOX),
    charge,
    billing,
    USE_SANDBOX
  );

  const error = await processCharge(
    token,
    getFromEnv("PRIVATE_TOKEN", USE_SANDBOX),
    charges[0].id,
    body.cardHash,
    body.email,
    USE_SANDBOX
  );

  if (error == null) {
    return {
      statusCode: 200,
      body: JSON.stringify({ orderNumber: charges[0].code }),
    };
  }

  if (error == 289999) {
    return { statusCode: 422 };
  }

  return { statusCode: 500 };
};

module.exports = { handler };
