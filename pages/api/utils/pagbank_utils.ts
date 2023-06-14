import axios, { AxiosInstance } from 'axios';
import { env } from 'process';
import { Fauna } from './fauna_utils';
import {
  FullBodyFields,
  PixFields,
  descriptionFromItems,
  totalFromItems,
} from './misc_utils';

const IS_SANDBOX = false;
const NOTIFICATION_URL = 'https://doar.caminhodecasa.org.br/api/pay-hook';

type PixResponse = {
  txid: string;
  imageUrl: string;
  copypaste: string;
};

function getFromEnv(variable: string, useSandbox: boolean): string {
  if (useSandbox) {
    return env[`SANDBOX_${variable}`];
  }

  return env[variable];
}

export class PagBank {
  api: AxiosInstance;

  fauna: Fauna;

  headers: {
    Authorization: string;
  };

  constructor() {
    this.api = axios.create({
      baseURL: IS_SANDBOX
        ? 'https://sandbox.api.pagseguro.com/'
        : 'https://api.pagseguro.com/',
    });

    this.fauna = new Fauna();
    this.headers = {
      Authorization: getFromEnv('PAGBANK_TOKEN', IS_SANDBOX),
    };
  }

  async createCardCharge(
    body: FullBodyFields,
  ): Promise<{ status: string; code?: string }> {
    const customer = {
      name: body.name,
      tax_id: body.cpf,
      email: body.email,
    };
    const items = body.items.map((item) => ({
      name: item.name,
      quantity: item.amount,
      unit_amount: item.price * 100,
    }));
    const charges = [
      {
        description: descriptionFromItems(body.items),
        amount: {
          value: totalFromItems(body.items) * 100,
          currency: 'BRL',
        },
        payment_method: {
          type: 'CREDIT_CARD',
          installments: 1,
          capture: true,
          card: {
            encrypted: body.cardHash,
            security_code: body.cvc,
            holder: {
              name: body.holderName,
            },
            store: false,
          },
        },
      },
    ];
    const notificationUrls = [NOTIFICATION_URL];

    try {
      const { data } = await this.api.post(
        '/orders',
        { customer, items, charges, notification_urls: notificationUrls },
        { headers: this.headers },
      );

      if (data.charges[0].payment_response.code === '20007') {
        throw Error('INVALID');
      }

      if (data.charges[0].payment_response.code !== '20000') {
        throw Error('REJECTED');
      }

      // Save charge to FaunaDB
      const chargeCode = data.charges[0].id
        .replace(/[^A-Z\d]/g, '')
        .substring(4);

      await this.fauna.recordCharge({
        chargeCode,
        email: body.email,
        name: body.name,
        amount: totalFromItems(body.items),
        paymentType: 'CREDIT_CARD',
        status: 'PAID',
      });

      return { status: 'SUCCESS', code: chargeCode };
    } catch (e) {
      if (typeof e === 'string') {
        return { status: e };
      }

      console.log('Failed to create charge!');
      console.log(e);
      return { status: 'UNKNOWN' };
    }
  }

  async createPixCharge(body: PixFields): Promise<PixResponse> {
    const customer = {
      name: body.name,
      tax_id: body.cpf,
      email: body.email,
    };
    const items = body.items.map((item) => ({
      name: item.name,
      quantity: item.amount,
      unit_amount: item.price * 100,
    }));
    const qrCodes = [
      {
        amount: {
          value: totalFromItems(body.items) * 100,
        },
      },
    ];
    const notificationUrls = [NOTIFICATION_URL];

    try {
      // Create charge
      const { data } = await this.api.post(
        '/orders',
        {
          customer,
          items,
          qr_codes: qrCodes,
          notification_urls: notificationUrls,
        },
        { headers: this.headers },
      );

      const copypaste = data.qr_codes[0].text;
      const txid = data.qr_codes[0].id;
      const imageUrlLink = data.qr_codes[0].links.find(
        (link) => link.rel === 'QRCODE.PNG',
      );
      const imageUrl = imageUrlLink?.href ?? '';

      // Save charge to FaunaDB with temporary pix code
      await this.fauna.recordCharge({
        pixCode: txid,
        email: body.email,
        name: body.name,
        amount: totalFromItems(body.items),
        paymentType: 'PIX',
        status: 'PENDING',
      });

      return { txid, copypaste, imageUrl };
    } catch (e) {
      console.log('Failed to create charge!');
      console.log(e);
      return null;
    }
  }
}
