const {
  getAccessToken,
  createCharge,
  processCharge,
  getFromEnv,
} = require("../pay-donation/juno_utils");

const USE_SANDBOX = true;

const handler = async (event) => {
  const { chargeCode } = JSON.parse(event.body);

  // Initialize Juno access
  const juno = new Juno();
  await juno.initHeaders();

  // Fetch charge by code
  const charge = await juno.fetchCharge(chargeCode);

  return { statusCode: 200 };
};

module.exports = { handler };
