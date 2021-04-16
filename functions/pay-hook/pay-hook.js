const { Fauna } = require("../shared/fauna_utils");
const { sendMail } = require("../shared/mail_utils");

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = JSON.parse(event.body);
  const data = body.data[0];

  console.log(JSON.stringify(body, null, 4));

  if (data.status != "PAID") {
    return { statusCode: 200 };
  }

  const fauna = new Fauna();
  if (data.attributes.pix) {
    console.log("hi");
    await fauna.updateCharge(data.attributes.pix.txid, "pixCode", {
      status: "PAID",
      chargeCode: data.attributes.code,
    });
  } else {
    console.log("hello");
    await fauna.updateCharge(data.attributes.code, "chargeCode", {
      status: "PAID",
    });
  }

  // Send success mail
  const charge = await fauna.fetchCharge(data.attributes.code);
  console.log(JSON.stringify(charge, null, 4));
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
