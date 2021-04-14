const { Fauna } = require("../shared/fauna_utils");
const { sendMail } = require("../shared/mail_utils");
const queryString = require("query-string");

const handler = async (event) => {
  const query = queryString.parse(event.body);
  const chargeCode = parseInt(query.chargeCode);

  // Update in DB
  const fauna = new Fauna();
  await fauna.updateCharge(chargeCode, "PAID");
  const charge = await fauna.fetchCharge(chargeCode);

  // Send success mail
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
