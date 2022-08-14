import type { NextApiRequest, NextApiResponse } from 'next';
import { matches } from 'validator';
import { Juno } from './utils/juno_utils';
import { sanitizeFields, fieldsAreValid } from './utils/misc_utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send(null);
  }

  const body = sanitizeFields(req.body);
  if (!fieldsAreValid(body) || !matches(body.cardHash, /[a-zA-Z0-9-]+/)) {
    return res.status(400).send(null);
  }

  // Initialize Juno access
  const juno = new Juno();
  await juno.initHeaders();

  // Create charge and payment
  try {
    const recordedCharge = await juno.createCardCharge(body);
    const error = await juno.processCharge(
      recordedCharge.id,
      recordedCharge.code,
      body,
    );

    // Check for errors
    if (error == null) {
      res.status(200).json({ orderNumber: recordedCharge.code });
    }

    if (error === 289999) {
      return res.status(422).send(null);
    }

    if (error === 503012) {
      return res.status(403).send(null);
    }

    throw Error('Unexpected error code found: ', error);
  } catch (e) {
    console.log('Error while processing payment: ', e);
    return res.status(500).send(null);
  }
}
