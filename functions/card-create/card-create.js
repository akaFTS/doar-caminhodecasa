const validator = require("validator");
const { Juno } = require("../shared/juno_utils");
const { sanitizeFields, fieldsAreValid } = require("../shared/misc_utils");

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const parsedBody = JSON.parse(event.body);
  const body = sanitizeFields(parsedBody);
  body.cardHash = parsedBody.cardHash;

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
      address
    );
  } catch (e) {
    console.log("Error while processing payment: ", e);
    error = "error";
  }

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

  console.log("An unexpected error occurred: ", error);
  return { statusCode: 500 };
};

module.exports = { handler };
