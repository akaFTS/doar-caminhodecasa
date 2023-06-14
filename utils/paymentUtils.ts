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
  holderName,
  cvc,
  expiry,
}): Promise<string> {
  // eslint-disable-next-line
  const prodKey =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhTrfoaDYFWq05KQ2DVOj1cUouwAdu0SfLihML6XzH5qa+xdf6LixreT8A0p29y7eePRUsj77M9qZfgFmuE4dcWJoOB8jqDgwmzXtzAQLFj3oEZ2eqAkqsPpQgotIIYntHqu9dwPwaXnLgQIECTaAdhownr8ZYJuPOxXflT2+za7PZchXNFo+wyvpqiSkPNAu7KUAGY08c+zP77vAtQKXEiL9DjieXR2pQJsnkswl2O/094+KI/d6l7+0dPS6i/m/HNc1Q4zzWFDD6IoHWnmkUwoL690B1Zy8g3y5ah97juY//zzJK257x05uskgRKFMljWE+1Bt3jynz75k3tnFpawIDAQAB';
  // eslint-disable-next-line
  const sandboxKey =
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB';

  // @ts-ignore: Globally included in _document.tsx
  const card = PagSeguro.encryptCard({
    publicKey: prodKey,
    holder: holderName,
    number: number.replace(/\D/g, ''),
    expMonth: expiry.substring(0, 2),
    expYear: `20${expiry.substring(3, 5)}`,
    securityCode: cvc,
  });

  return card.encryptedCard;
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
