import { create, post } from 'axios';
import { env } from 'process';
import { Buffer } from 'buffer';
import { Fauna } from './fauna_utils';

const IS_SANDBOX = false;

function getFromEnv(variable, useSandbox) {
  if (useSandbox) {
    return env[`SANDBOX_${variable}`];
  }

  return env[variable];
}

export class Juno {
  constructor() {
    this.api = create({
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
      const { data } = await post(
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

  async createCardCharge(charge, billing) {
    try {
      const { data } = await this.api.post(
        '/charges',
        { charge: { ...charge, paymentTypes: ['CREDIT_CARD'] }, billing },
        { headers: this.headers },
      );

      // eslint-disable-next-line no-underscore-dangle
      const recordedCharge = data._embedded.charges[0];

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

  async processCharge(chargeId, chargeCode, creditCardHash, email, address) {
    const body = {
      chargeId,
      creditCardDetails: { creditCardHash },
      billing: { email, address },
    };

    try {
      await this.api.post('/payments', body, {
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

  async createPixCharge(charge, billing) {
    const body = {
      devedor: {
        cpf: billing.document,
        nome: billing.name,
      },
      valor: {
        original: `${charge.amount}.00`,
      },
      chave: getFromEnv('PIX_KEY', IS_SANDBOX),
      solicitacaoPagador: charge.description,
    };

    try {
      // Create charge
      const response = await this.api.post('/pix-api/v2/cob', body, {
        headers: this.headers,
      });

      // Fetch qrcode
      const { txid } = response.data;
      const qrResponse = await this.api.get(
        `/pix-api/qrcode/v2/${txid}/imagem`,
        { headers: this.headers },
      );

      // Save charge to FaunaDB with temporary pix code
      await this.fauna.recordCharge({
        pixCode: txid,
        email: billing.email,
        name: billing.name,
        amount: charge.amount,
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
