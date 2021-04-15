const { Fauna } = require("../shared/fauna_utils");

const handler = async (event) => {
  // Ignore non-GET calls
  if (event.httpMethod != "GET") {
    return { statusCode: 400 };
  }

  const txid = event.queryStringParameters.txid;
  const fauna = new Fauna();
  const { isPaid, chargeCode } = await fauna.isPaid(txid);
  return { statusCode: 200, body: JSON.stringify({ isPaid, chargeCode }) };
};

module.exports = { handler };
