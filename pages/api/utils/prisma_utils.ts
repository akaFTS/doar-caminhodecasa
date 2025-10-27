import { Prisma, PrismaClient, Status } from '@prisma/client';

export class PrismaUtils {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async recordCharge(charge: Prisma.ChargeCreateInput) {
    try {
      await this.prisma.charge.create({
        data: charge,
      });
    } catch (error) {
      console.log('An error occurred while recording: ', error);
    }
  }

  async updateCharge(
    pixCode: string,
    updatedChargeFields: Prisma.ChargeUpdateInput,
  ) {
    try {
      await this.prisma.charge.updateMany({
        where: { pixCode },
        data: updatedChargeFields,
      });
    } catch (error) {
      if (error.errorType === 'NotFound') {
        console.log("Can't find entry.");
      }
      console.log('An error occurred while updating: ', error);
    }
  }

  async fetchCharge(
    chargeCode: string,
  ): Promise<Prisma.ChargeGetPayload<Prisma.ChargeFindFirstArgs>> {
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
      const charge = await this.prisma.charge.findFirst({
        where: { pixCode: txid },
      });
      return {
        isPaid: charge.status === Status.PAID,
        total: charge.amount,
        chargeCode: charge.chargeCode,
      };
    } catch (error) {
      console.log('An error occurred while fetching: ', error);
      return { isPaid: false, chargeCode: null, total: 0 };
    }
  }
}
