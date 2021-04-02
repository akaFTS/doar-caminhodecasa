const validator = require("validator");

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
    cpf: validator.escape(body.cpf),
    number: validator.escape(body.number),
    cardname: validator.escape(body.cardname),
    cvc: validator.escape(body.cvc),
    issuer: validator.escape(body.issuer),
    total: validator.escape(body.total + ""),
    expiry: body.expiry,
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

  if (!validator.isCreditCard(body.number)) {
    return false;
  }

  if (!validator.isAlpha(body.cardname, "pt-BR", { ignore: " " })) {
    return false;
  }

  if (!validator.isInt(body.cvc)) {
    return false;
  }

  if (!validator.isAlpha(body.issuer)) {
    return false;
  }

  if (!validator.isInt(body.total)) {
    return false;
  }

  if (!validator.isDate("01/" + body.expiry, { format: "DD/MM/YY" })) {
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

  // Perform Juno connection
  // TODO

  return { statusCode: 200, body: JSON.stringify({ orderNumber: 12345678 }) };
};

module.exports = { handler };
