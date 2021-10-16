const { Fauna } = require("../shared/fauna_utils");
const { sendMail, sendCiclumPixMail } = require("../shared/mail_utils");

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = JSON.parse(event.body);
  const { attributes } = body.data[0];

  if (attributes.status != "PAID") {
    return { statusCode: 200 };
  }

  const fauna = new Fauna();
  if (attributes.pix) {
    await fauna.updateCharge(attributes.pix.txid, "pixCode", {
      status: "PAID",
      chargeCode: attributes.code,
    });
  } else {
    await fauna.updateCharge(attributes.code, "chargeCode", {
      status: "PAID",
    });
  }

  // Send success mail
  const charge = await fauna.fetchCharge(attributes.code);
  await sendMail({
    code: charge.chargeCode,
    name: charge.name,
    amount: charge.amount,
    paymentType: charge.paymentType,
    email: charge.email,
  });

  // Send an email to Ciclum in case of Pix as the default email from Juno contains no information
  console.log("Attempting to send email.");
  console.log(attributes);
  console.log(charge);
  if (attributes.pix) {
    await sendCiclumPixMail({
      name: charge.name,
      amount: charge.amount,
      email: charge.email,
    });
    console.log("Email sent.")
  } else {
    console.log("Not pix.");
  }

  return { statusCode: 200 };
};

module.exports = { handler };
