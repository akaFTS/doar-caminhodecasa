import { NextApiRequest, NextApiResponse } from 'next';
import { Fauna } from './utils/fauna_utils';
import { sendMail } from './utils/mail_utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send(null);
  }

  const { charges } = req.body;
  if (!charges) {
    return res.status(200).send(null);
  }

  const paymentStatus = charges[0].status;
  const paymentMethod = charges[0].payment_method.type;
  const chargeCode = charges[0].id.replace(/[^A-Z\d]/g, '').substring(4);
  if (paymentStatus !== 'PAID') {
    return res.status(200).send(null);
  }

  const fauna = new Fauna();
  if (paymentMethod === 'PIX') {
    const { qr_codes: qrCodes } = req.body;
    const txid = qrCodes[0].id;
    await fauna.updateCharge(txid, {
      status: 'PAID',
      chargeCode,
    });
  }

  // Send success mail
  const charge = await fauna.fetchCharge(chargeCode);
  await sendMail({
    code: charge.chargeCode,
    name: charge.name,
    amount: charge.amount,
    paymentType: charge.paymentType,
    email: charge.email,
  });

  // Send an email to Ciclum in case of Pix as the default email from Juno contains no information
  // await sendCiclumPixMail({
  //   name: charge.name,
  //   amount: charge.amount,
  //   email: charge.email,
  // });

  return res.status(200).send(null);
}
