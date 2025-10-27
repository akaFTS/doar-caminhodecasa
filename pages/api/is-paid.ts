import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaUtils } from './utils/prisma_utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ignore non-GET calls
  if (req.method !== 'GET') {
    return res.status(400).send(null);
  }

  const txid = req.query.txid as string;
  const prisma = new PrismaUtils();
  const data = await prisma.getPaidStatusAndData(txid);
  return res.status(200).json(data);
}
