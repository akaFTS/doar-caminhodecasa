import { env } from 'process';
import { query, Client } from 'faunadb';
import { Charge } from './misc_utils';

export class Fauna {
  client: Client;

  constructor() {
    this.client = new Client({
      secret: env.FAUNADB_SERVER_SECRET,
    });
  }

  async recordCharge(charge: Charge) {
    try {
      await this.client.query(
        query.Create(query.Collection('doar-payments'), { data: charge }),
      );
    } catch (error) {
      console.log('An error occurred while recording: ', error);
    }
  }

  async updateCharge(pixCode: string, updatedChargeFields: Partial<Charge>) {
    try {
      await this.client.query(
        query.Update(
          query.Select(
            ['ref'],
            query.Get(query.Match(query.Index('pixCode'), pixCode)),
          ),
          {
            data: { ...updatedChargeFields },
          },
        ),
      );
    } catch (error) {
      if (error.errorType === 'NotFound') {
        console.log("Can't find entry.");
      }
      console.log('An error occurred while updating: ', error);
    }
  }

  async fetchCharge(chargeCode: string): Promise<Charge> {
    try {
      const response: { data: Charge } = await this.client.query(
        query.Get(query.Match(query.Index('chargeCode'), chargeCode)),
      );
      return response.data;
    } catch (error) {
      console.log('An error occurred while fetching: ', error);
      return null;
    }
  }

  async getPaidStatusAndData(txid: string): Promise<{
    isPaid: boolean;
    total: number;
    chargeCode: string;
  }> {
    try {
      const response: { data: Charge } = await this.client.query(
        query.Get(query.Match(query.Index('pixCode'), txid)),
      );
      return {
        isPaid: response.data.status === 'PAID',
        total: response.data.amount,
        chargeCode: response.data.chargeCode,
      };
    } catch (error) {
      console.log('An error occurred while fetching: ', error);
      return { isPaid: false, chargeCode: null, total: 0 };
    }
  }
}
