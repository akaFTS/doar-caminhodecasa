import { Juno } from './utils/juno_utils';
import { sanitizePixFields, fieldsAreValid } from './utils/misc_utils';
import { Buffer } from 'buffer';

export default async function handler(req, res) {
  console.log('pass it on');

  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send();
  }
  const body = sanitizePixFields(req.body);
  if (!fieldsAreValid(body)) {
    return res.status(400).send();
  }

  // Initialize Juno access
  const juno = new Juno();
  await juno.initHeaders();

  // Prepare charge
  const billing = {
    name: body.name,
    document: body.cpf,
    email: body.email,
  };
  const charge = {
    installments: 1,
    amount: body.total,
    description: body.description,
    paymentTypes: ['PIX'],
  };

  // Create charge
  const data = await juno.createPixCharge(charge, billing);
  if (data == null) {
    return res.status(500).send();
  }

  return res.status(200).json({
    qrcode: data.imagemBase64,
    copypaste: Buffer.from(data.qrcodeBase64, 'base64').toString(),
    txid: data.txid,
  });
}
