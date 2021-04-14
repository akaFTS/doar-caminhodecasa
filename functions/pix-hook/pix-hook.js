const handler = async (event) => {
  console.log(event.httpMethod);
  console.log(event.body);
  console.log(event.headers);

  return {
    statusCode: 200,
  };
};

module.exports = { handler };
