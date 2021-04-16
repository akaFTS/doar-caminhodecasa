const { Fauna } = require("../shared/fauna_utils");

const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = JSON.parse(event.body);
  const { attributes } = body.data[0];

  console.log(event.body);

  if (!attributes.pix) {
    return { statusCode: 200 };
  }

  // Update charge in DB with correct charge code
  const fauna = new Fauna();
  await fauna.swapTxidByChargeCode(attributes.pix.txid, attributes.code);

  return { statusCode: 200 };
};

module.exports = { handler };
