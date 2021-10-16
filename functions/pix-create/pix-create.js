const { Juno } = require("../shared/juno_utils");
const { sanitizePixFields, fieldsAreValid } = require("../shared/misc_utils");
const { Buffer } = require("buffer");

const handler = async (event) => {

  console.log("pass it on");

  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = sanitizePixFields(JSON.parse(event.body));
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
  };
  const charge = {
    installments: 1,
    amount: body.total,
    description: body.description,
    paymentTypes: ["PIX"],
  };

  // Create charge
  console.log("coming through");
  const data = await juno.createPixCharge(charge, billing);
  if (data == null) {
    console.log("hello");
    return { statusCode: 500 };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      qrcode: data.imagemBase64,
      copypaste: Buffer.from(data.qrcodeBase64, "base64").toString(),
      txid: data.txid,
    }),
  };
};

module.exports = { handler };
