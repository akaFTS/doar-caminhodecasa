import { Juno } from './utils/juno_utils';
import { sanitizePixFields, fieldsAreValid } from './utils/misc_utils';
import { Buffer } from 'buffer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send(null);
  }
  const body = sanitizePixFields(req.body);
  if (!fieldsAreValid(body)) {
    return res.status(400).send(null);
  }

  // Initialize Juno access
  const juno = new Juno();
  await juno.initHeaders();

  // Create charge
  const data = await juno.createPixCharge(body);
  if (data == null) {
    return res.status(500).send(null);
  }

  return res.status(200).json({
    qrcode: data.imagemBase64,
    copypaste: Buffer.from(data.qrcodeBase64, 'base64').toString(),
    txid: data.txid,
  });
}
