import axios, { AxiosInstance } from 'axios';
import { env } from 'process';
import { Buffer } from 'buffer';
import { Fauna } from './fauna_utils';
import { FullBodyFields, PixFields } from './misc_utils';

const IS_SANDBOX = false;

type PixResponse = {
  txid: string;
  imagemBase64: string;
  qrcodeBase64: string;
};

function getFromEnv(variable: string, useSandbox: boolean): string {
  if (useSandbox) {
    return env[`SANDBOX_${variable}`];
  }

  return env[variable];
}

export class Juno {
  api: AxiosInstance;

  fauna: Fauna;

  headers: {
    'X-Api-Version': number;
    Authorization: string;
    'X-Resource-Token': string;
  };

  constructor() {
    this.api = axios.create({
      baseURL: IS_SANDBOX
        ? 'https://sandbox.boletobancario.com/api-integration'
        : 'https://api.juno.com.br',
    });

    this.fauna = new Fauna();
  }

  async initHeaders() {
    // Produce access hash
    const hash = Buffer.from(
      `${getFromEnv('CLIENT_ID', IS_SANDBOX)}:${getFromEnv(
        'CLIENT_SECRET',
        IS_SANDBOX,
      )}`,
    ).toString('base64');

    try {
      // Acquire access token
      const { data } = await axios.post(
        IS_SANDBOX
          ? 'https://sandbox.boletobancario.com/authorization-server/oauth/token'
          : 'https://api.juno.com.br/authorization-server/oauth/token',
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${hash}`,
          },
        },
      );

      // Set headers
      this.headers = {
        'X-Api-Version': 2,
        'X-Resource-Token': getFromEnv('PRIVATE_TOKEN', IS_SANDBOX),
        Authorization: `Bearer ${data.access_token}`,
      };
    } catch (e) {
      console.log('Authorization error!');
      console.log(e.response.data);
    }
  }

  async createCardCharge(
    body: FullBodyFields,
  ): Promise<{ code: string; id: string }> {
    const billing = {
      name: body.name,
      document: body.cpf,
      email: body.email,
    };
    const charge = {
      installments: 1,
      amount: body.total,
      description: body.description,
      paymentTypes: ['CREDIT_CARD'],
    };

    try {
      const { data } = await this.api.post(
        '/charges',
        { charge, billing },
        { headers: this.headers },
      );

      const recordedCharge: { code: string; id: string } =
        // eslint-disable-next-line no-underscore-dangle
        data._embedded.charges[0];

      // Save charge to FaunaDB
      await this.fauna.recordCharge({
        chargeCode: recordedCharge.code,
        email: billing.email,
        name: billing.name,
        amount: charge.amount,
        paymentType: 'CREDIT_CARD',
        status: 'PENDING',
      });

      return recordedCharge;
    } catch (e) {
      console.log('Failed to create charge!');
      console.log(e.response.data);
      return null;
    }
  }

  async processCharge(
    chargeId: string,
    chargeCode: string,
    body: FullBodyFields,
  ) {
    const address = {
      street: body.street,
      number: body.streetNumber,
      complement: body.complement,
      city: body.city,
      state: body.state,
      postCode: body.cep,
    };

    const payload = {
      chargeId,
      creditCardDetails: { creditCardHash: body.cardHash },
      billing: { email: body.email, address },
    };

    try {
      await this.api.post('/payments', payload, {
        headers: this.headers,
      });
    } catch (e) {
      const error = e.response.data.details[0].errorCode;

      // Record charge as rejected
      if (error === 289999) {
        await this.fauna.updateCharge(chargeCode, 'chargeCode', {
          status: 'DENIED',
        });
      }

      return error;
    }

    return null;
  }

  async createPixCharge(body: PixFields): Promise<PixResponse> {
    const payload = {
      devedor: {
        cpf: body.cpf,
        nome: body.name,
      },
      valor: {
        original: `${body.total}.00`,
      },
      chave: getFromEnv('PIX_KEY', IS_SANDBOX),
      solicitacaoPagador: body.description,
    };

    try {
      // Create charge
      const response = await this.api.post<{ txid: string }>(
        '/pix-api/v2/cob',
        payload,
        {
          headers: this.headers,
        },
      );

      // Fetch qrcode
      const { txid } = response.data;
      const qrResponse = await this.api.get<{
        imagemBase64: string;
        qrcodeBase64: string;
      }>(`/pix-api/qrcode/v2/${txid}/imagem`, { headers: this.headers });

      // Save charge to FaunaDB with temporary pix code
      await this.fauna.recordCharge({
        pixCode: txid,
        email: body.email,
        name: body.name,
        amount: body.total,
        paymentType: 'PIX',
        status: 'PENDING',
      });

      return { ...qrResponse.data, txid };
    } catch (e) {
      console.log('Failed to create charge!');
      console.log(e.response.data);
      return null;
    }
  }
}
