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

function sanitizeFields(body) {
  return {
    ...sanitizePixFields(body),
    street: validator.escape(body.street),
    streetNumber: validator.escape(body.streetNumber),
    complement: validator.escape(body.complement),
    city: validator.escape(body.city),
    state: validator.escape(body.state),
    cep: validator.escape(body.cep),
  };
}

function sanitizePixFields(body) {
  return {
    name: validator.escape(body.name),
    email: validator.escape(body.email),
    cpf: validator.escape(body.cpf.replace(/[.-]/g, "")),
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

  if (!validator.isInt(body.total)) {
    return false;
  }

  return true;
}

module.exports = { sanitizeFields, sanitizePixFields, fieldsAreValid };
