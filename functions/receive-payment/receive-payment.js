const { Fauna } = require("../utils/fauna_utils");
const { sendMail } = require("../utils/mail_utils");
const queryString = require("query-string");

const handler = async (event) => {
  const { chargeCode } = queryString.parse(event.body);
  console.log(chargeCode);

  return;

  // Update in DB
  const fauna = new Fauna();
  await fauna.updateCharge(chargeCode, "PAID");
  const charge = await fauna.fetchCharge(chargeCode);

  // Send success mail
  // await sendMail({
  //   code: "98765432",
  //   name: "Jair Bolsonaro",
  //   amount: "25",
  //   paymentType: "CREDIT_CARD",
  //   email: "gustavohfts1@gmail.com",
  // });

  return { statusCode: 200 };
};

module.exports = { handler };
