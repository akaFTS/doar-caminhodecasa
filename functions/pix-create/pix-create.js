const { Juno } = require("../shared/juno_utils");
const { sanitizeFields, fieldsAreValid } = require("../shared/misc_utils");
const { Buffer } = require("buffer");

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = sanitizeFields(JSON.parse(event.body));
  if (!fieldsAreValid(body)) {
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
    paymentTypes: ["PIX"],
  };

  // Create charge
  const data = await juno.createPixCharge(charge, billing);
  if (data == null) {
    return { statusCode: 500 };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      qrcode: data.imagemBase64,
      copypaste: Buffer.from(data.qrcodeBase64, "base64").toString(),
    }),
  };
};

module.exports = { handler };
