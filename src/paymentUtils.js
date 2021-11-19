import Payment from "payment";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case "dinersclub":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === "amex" ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function tokenizeCard({ number, cardname, cvc, expiry }) {
  // Sandbox
  // const checkout = new DirectCheckout(
  //   "3A17C3AB5700A8BCE54167690CF4605A061444C2D5484F975C719ED71D0D476B",
  //   false
  // );

  // Production
  const checkout = new DirectCheckout(
    "EAE13EE6623EEC3F1C9381124D6EBE79D2B3579398D7BF0B47CF187137FACCBC217982970CA6740E"
  );

  const cardData = {
    cardNumber: number.replace(/\D/g, ""),
    holderName: cardname,
    securityCode: cvc,
    expirationMonth: expiry.substring(0, 2),
    expirationYear: "20" + expiry.substring(3, 5),
  };

  const cardPromise = new Promise((resolve, reject) =>
    checkout.getCardHash(cardData, resolve, reject)
  );

  return cardPromise;
}

export function anyBlank(obj, except = []) {
  return Object.entries(obj).some(([key, val]) => {
    if (except.includes(key)) return false;

    return !val || /^\s*$/.test(val);
  });
}

export function checkCPF(cpf) {
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
