import Payment from 'payment';

function removeNonNumericChars(value = ''): string {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value: string): string {
  if (value === '') {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = removeNonNumericChars(value);
  let nextValue: string;

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10,
      )} ${clearValue.slice(10, 15)}`;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10,
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8,
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value: string): string {
  const clearValue = removeNonNumericChars(value);
  return clearValue.slice(0, 4);
}

export function formatExpirationDate(value: string): string {
  const clearValue = removeNonNumericChars(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function tokenizeCard({
  number,
  cardname,
  cvc,
  expiry,
}): Promise<string> {
  // Sandbox
  // const checkout = new DirectCheckout(
  //   "3A17C3AB5700A8BCE54167690CF4605A061444C2D5484F975C719ED71D0D476B",
  //   false
  // );

  // Production
  // eslint-disable-next-line no-undef
  // @ts-ignore
  const checkout = new DirectCheckout(
    'EAE13EE6623EEC3F1C9381124D6EBE79D2B3579398D7BF0B47CF187137FACCBC217982970CA6740E',
  );

  const cardData = {
    cardNumber: number.replace(/\D/g, ''),
    holderName: cardname,
    securityCode: cvc,
    expirationMonth: expiry.substring(0, 2),
    expirationYear: `20${expiry.substring(3, 5)}`,
  };

  const cardPromise = new Promise<string>((resolve, reject) => {
    checkout.getCardHash(cardData, resolve, reject);
  });

  return cardPromise;
}

export function anyBlank(obj: Object, except: string[] = []): boolean {
  return Object.entries(obj).some(([key, val]) => {
    if (except.includes(key)) return false;

    return !val || /^\s*$/.test(val);
  });
}

export function checkCPF(cpf: string): boolean {
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
