import { NextApiRequest, NextApiResponse } from 'next';
import { Fauna } from './utils/fauna_utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ignore non-GET calls
  if (req.method !== 'GET') {
    return res.status(400).send(null);
  }

  const txid = req.query.txid as string;
  const fauna = new Fauna();
  const { isPaid, chargeCode } = await fauna.getPaidStatusAndChargeCode(txid);
  return res.status(200).json({ isPaid, chargeCode });
}
