const { Fauna } = require("../pay-donation/fauna_utils");

const handler = async (event) => {
  console.log(event);
  const { chargeCode } = JSON.parse(event.body);

  // Update in DB
  const fauna = new Fauna();
  const charge = await fauna.updateCharge(chargeCode, "PAID");

  // Send success mail

  return { statusCode: 200 };
};

module.exports = { handler };
