import { matches } from 'validator';
import { Juno } from './utils/juno_utils';
import { sanitizeFields, fieldsAreValid } from './utils/misc_utils';

export default async function handler(req, res) {
  // Ignore non-POST calls
  if (req.method !== 'POST') {
    return res.status(400).send();
  }

  const body = sanitizeFields(req.body);
  body.cardHash = req.body.cardHash;

  const bodyIsValid = fieldsAreValid(body);
  if (!bodyIsValid || !matches(body.cardHash, /[a-zA-Z0-9-]+/)) {
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
  };
  const address = {
    street: body.street,
    number: body.streetNumber,
    complement: body.complement,
    city: body.city,
    state: body.state,
    postCode: body.cep,
  };

  // Create charge and payment
  let recordedCharge;
  let error;
  try {
    recordedCharge = await juno.createCardCharge(charge, billing);
    error = await juno.processCharge(
      recordedCharge.id,
      recordedCharge.code,
      body.cardHash,
      body.email,
      address,
    );
  } catch (e) {
    console.log('Error while processing payment: ', e);
    error = 'error';
  }

  // Check for errors
  if (error == null) {
    res.status(200).json({ orderNumber: recordedCharge.code });
  }

  if (error === 289999) {
    return res.status(422).send();
  }

  if (error === 503012) {
    return res.status(403).send();
  }

  console.log('An unexpected error occurred: ', error);
  return res.status(500).send();
}
