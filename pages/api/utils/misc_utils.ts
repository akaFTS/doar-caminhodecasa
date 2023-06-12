import { SimpleBasketItem } from 'types/basket';
import { escape, isAlpha, isEmail } from 'validator';

export type PixFields = {
  name: string;
  email: string;
  cpf: string;
  items: SimpleBasketItem[];
};

export type FullBodyFields = PixFields & {
  street: string;
  streetNumber: string;
  complement: string;
  city: string;
  state: string;
  cep: string;
  cardHash: string;
  holderName: string;
  cvc: string;
};

export type Charge = {
  pixCode?: string;
  chargeCode?: string;
  email: string;
  name: string;
  amount: number;
  paymentType: 'CREDIT_CARD' | 'PIX';
  status: 'PENDING' | 'PAID' | 'DENIED';
};

function sanitizeItems(items: SimpleBasketItem[]): SimpleBasketItem[] {
  return items.map((item) => ({
    name: escape(item.name),
    price: parseInt(escape(`${item.price}`), 10),
    amount: parseInt(escape(`${item.amount}`), 10),
  }));
}

function checkCPF(cpf: string): boolean {
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

export function sanitizePixFields(body: PixFields): PixFields {
  return {
    name: escape(body.name),
    email: escape(body.email),
    cpf: escape(body.cpf.replace(/[.-]/g, '')),
    items: sanitizeItems(body.items),
  };
}

export function sanitizeFields(body: FullBodyFields): FullBodyFields {
  return {
    ...sanitizePixFields(body),
    street: escape(body.street),
    streetNumber: escape(body.streetNumber),
    complement: escape(body.complement),
    city: escape(body.city),
    state: escape(body.state),
    cep: escape(body.cep),
    cardHash: body.cardHash,
    holderName: escape(body.holderName),
    cvc: escape(`${body.cvc}`),
  };
}

export function fieldsAreValid(body: PixFields): boolean {
  if (!isAlpha(body.name, 'pt-BR', { ignore: ' ' })) {
    return false;
  }

  if (!isEmail(body.email)) {
    return false;
  }

  if (!checkCPF(body.cpf)) {
    return false;
  }

  return true;
}

export function descriptionFromItems(items: SimpleBasketItem[]): string {
  return items
    .map(
      (item) =>
        `${item.name} x${item.amount} : R$${item.amount * item.price},00`,
    )
    .join(' - ');
}

export function totalFromItems(items: SimpleBasketItem[]): number {
  return items.reduce(
    (acc, current) => acc + current.amount * current.price,
    0,
  );
}
