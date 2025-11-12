import type { NextApiRequest, NextApiResponse } from 'next';
import { PagBank } from './utils/pagbank_utils';
import { sanitizeFields, fieldsAreValid } from './utils/misc_utils';
import { PrismaUtils } from './utils/prisma_utils';
import { sendMail } from './utils/mail_utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Cache-Control', 'no-store');

  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send(null);
  }

  const body = sanitizeFields(req.body);
  if (!fieldsAreValid(body)) {
    return res.status(400).send(null);
  }

  // Create charge and payment
  try {
    const pag = new PagBank();
    const response = await pag.createCardCharge(body);

    if (response.status === 'SUCCESS') {
      const prisma = new PrismaUtils();

      const charge = await prisma.fetchCharge(response.code);
      await sendMail({
        code: charge.chargeCode,
        name: charge.name,
        amount: charge.amount,
        paymentType: charge.paymentType,
        email: charge.email,
      });

      return res.status(200).json({ orderNumber: response.code });
    }

    if (response.status === 'INVALID') {
      return res.status(400).send(null);
    }

    if (response.status === 'REJECTED') {
      return res.status(422).send(null);
    }

    throw Error('Unexpected error code found');
  } catch (e) {
    console.log('Error while processing payment: ', e);
    return res.status(500).send(null);
  }
}

export const revalidate = 0;
