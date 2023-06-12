export type PersonalData = {
  name: string;
  cpf: string;
  email: string;
};

export type CardData = {
  number: string;
  holderName: string;
  cvc: string;
  expiry: string;
};

export type CepData = {
  cep: string;
  street: string;
  city: string;
  state: string;
};

export type AddressData = CepData & {
  streetNumber: string;
  complement: string;
};

export type CheckoutError =
  | 'blank'
  | 'cpf'
  | 'email'
  | 'name'
  | 'pix_blank'
  | 'server_validation'
  | 'server_card'
  | 'unknown';
