import { env } from 'process';
import { PrismaClient } from '@prisma/client';
import { Charge } from './misc_utils';

export class Fauna {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
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
      return await this.prisma.charge.findFirst({
        where: { chargeCode },
      });
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
      const charge : Charge = await this.prisma.charge.findFirst({
        where: { pixCode: txid },
      });
      return {
        isPaid: charge.status === 'PAID',
        total: charge.amount,
        chargeCode: charge.chargeCode,
      };
    } catch (error) {
      console.log('An error occurred while fetching: ', error);
      return { isPaid: false, chargeCode: null, total: 0 };
    }
  }
}
