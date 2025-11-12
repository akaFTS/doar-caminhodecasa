import { PagBank } from './utils/pagbank_utils';
import { sanitizePixFields, fieldsAreValid } from './utils/misc_utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader('Cache-Control', 'no-store');

  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send(null);
  }
  const body = sanitizePixFields(req.body);
  if (!fieldsAreValid(body)) {
    return res.status(400).send(null);
  }

  // Create charge
  const pag = new PagBank();
  const data = await pag.createPixCharge(body);
  if (data == null) {
    return res.status(500).send(null);
  }

  return res.status(200).json({
    qrcodeUrl: data.imageUrl,
    copypaste: data.copypaste,
    txid: data.txid,
  });
}

export const revalidate = 0;
