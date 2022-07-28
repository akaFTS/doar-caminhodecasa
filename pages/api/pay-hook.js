import { Fauna } from './utils/fauna_utils';
import { sendMail, sendCiclumPixMail } from './utils/mail_utils';

export default async function handler(req, res) {
  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send();
  }

  const { attributes } = req.body.data[0];

  if (attributes.status !== 'PAID') {
    return res.status(200).send();
  }

  const fauna = new Fauna();
  if (attributes.pix) {
    await fauna.updateCharge(attributes.pix.txid, 'pixCode', {
      status: 'PAID',
      chargeCode: attributes.code,
    });
  } else {
    await fauna.updateCharge(attributes.code, 'chargeCode', {
      status: 'PAID',
    });
  }

  // Send success mail
  const charge = await fauna.fetchCharge(attributes.code);
  await sendMail({
    code: charge.chargeCode,
    name: charge.name,
    amount: charge.amount,
    paymentType: charge.paymentType,
    email: charge.email,
  });

  // Send an email to Ciclum in case of Pix as the default email from Juno contains no information
  if (attributes.pix) {
    await sendCiclumPixMail({
      name: charge.name,
      amount: charge.amount,
      email: charge.email,
    });
  }

  return res.status(200).send();
}
