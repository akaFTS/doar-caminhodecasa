import { escape, isAlpha, isEmail, isInt } from 'validator';

export function sanitizePixFields(body) {
  return {
    name: escape(body.name),
    email: escape(body.email),
    cpf: escape(body.cpf.replace(/[.-]/g, '')),
    total: escape(`${body.total}`),
    description: escape(body.description),
  };
}

function checkCPF(cpf) {
  let cleanCpf = cpf.replace(/[^\d]+/g, '');
  if (cleanCpf === '') return false;
  if (cleanCpf.length !== 11) return false;

  let sum;
  let remainder;
  sum = 0;
  cleanCpf = cleanCpf.replace(/[^\d]+/g, '');

  if (
    // Reject known invalid CPFs
    cleanCpf === '11111111111' ||
    cleanCpf === '22222222222' ||
    cleanCpf === '33333333333' ||
    cleanCpf === '44444444444' ||
    cleanCpf === '55555555555' ||
    cleanCpf === '66666666666' ||
    cleanCpf === '77777777777' ||
    cleanCpf === '88888888888' ||
    cleanCpf === '99999999999' ||
    cleanCpf === '00000000000'
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i += 1) {
    sum += parseInt(cleanCpf.substring(i - 1, i), 10) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(9, 10), 10)) return false;
  sum = 0;

  for (let i = 1; i <= 10; i += 1) {
    sum += parseInt(cleanCpf.substring(i - 1, i), 10) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(10, 11), 10)) return false;

  return true;
}

export function sanitizeFields(body) {
  return {
    ...sanitizePixFields(body),
    street: escape(body.street),
    streetNumber: escape(body.streetNumber),
    complement: escape(body.complement),
    city: escape(body.city),
    state: escape(body.state),
    cep: escape(body.cep),
  };
}

export function fieldsAreValid(body) {
  if (!isAlpha(body.name, 'pt-BR', { ignore: ' ' })) {
    return false;
  }

  if (!isEmail(body.email)) {
    return false;
  }

  if (!checkCPF(body.cpf)) {
    return false;
  }

  if (!isInt(body.total)) {
    return false;
  }

  return true;
}

export default { sanitizeFields, sanitizePixFields, fieldsAreValid };
