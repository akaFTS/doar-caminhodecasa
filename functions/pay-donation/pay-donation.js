const validator = require("validator");
const { Juno } = require("../shared/juno_utils");
const { sanitizeFields, fieldsAreValid } = require("../shared/misc_utils");

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = sanitizeFields(JSON.parse(event.body));
  body.cardHash = event.body.cardHash;

  const bodyIsValid = fieldsAreValid(body);
  if (!bodyIsValid || !validator.matches(body.cardHash, /[a-zA-Z0-9-]+/)) {
    return { statusCode: 400 };
  }

  // Initialize Juno access
  const juno = new Juno();
  await juno.initHeaders();

  // Prepare charge
  const billing = {
    name: body.name,
    document: body.cpf,
    email: body.email,
    phone: body.phone,
  };
  const charge = {
    installments: 1,
    amount: body.total,
    description: body.description,
    paymentTypes: ["CREDIT_CARD"],
  };

  // Create charge and payment
  const recordedCharge = await juno.createCardCharge(charge, billing);
  const error = await juno.processCharge(
    recordedCharge.id,
    recordedCharge.code,
    body.cardHash,
    body.email
  );

  // Check for errors
  if (error == null) {
    return {
      statusCode: 200,
      body: JSON.stringify({ orderNumber: recordedCharge.code }),
    };
  }

  if (error == 289999) {
    return { statusCode: 422 };
  }

  return { statusCode: 500 };
};

module.exports = { handler };
