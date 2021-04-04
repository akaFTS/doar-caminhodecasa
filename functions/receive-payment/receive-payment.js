const handler = async (event) => {
  console.log(event);
  return { statusCode: 200, body: "hello world" };
};

module.exports = { handler };
