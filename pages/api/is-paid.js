import { Fauna } from './utils/fauna_utils';

export default async function handler(req, res) {
  // Ignore non-GET calls
  if (req.method !== 'GET') {
    return res.status(400).send();
  }

  const { txid } = req.query;
  const fauna = new Fauna();
  const { isPaid, chargeCode } = await fauna.isPaid(txid);
  return res.status(200).json({ isPaid, chargeCode });
}
