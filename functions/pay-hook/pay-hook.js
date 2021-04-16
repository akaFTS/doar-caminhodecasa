const { Fauna } = require("../shared/fauna_utils");
const { sendMail } = require("../shared/mail_utils");

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = JSON.parse(event.body);
  const data = body.data[0];

  if (data.status != "PAID") {
    return { statusCode: 200 };
  }

  const fauna = new Fauna();
  if (data.attributes.pix) {
    await fauna.updateCharge(data.attributes.pix.txid, "pixCode", {
      status: "PAID",
      chargeCode: data.attributes.code,
    });
  } else {
    await fauna.updateCharge(data.attributes.code, "chargeCode", {
      status: "PAID",
    });
  }

  // Send success mail
  const charge = await fauna.fetchCharge(data.attributes.code);
  await sendMail({
    code: charge.chargeCode,
    name: charge.name,
    amount: charge.amount,
    paymentType: charge.paymentType,
    email: charge.email,
  });

  return { statusCode: 200 };
};

module.exports = { handler };
