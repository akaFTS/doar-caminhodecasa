const handler = async (event) => {
  // Ignore non-POST calls
  if (event.httpMethod != "POST") {
    return { statusCode: 400 };
  }

  const body = JSON.parse(event.body);
  const { attributes } = body.data[0];

  if (!attributes.pix) {
    console.log("Not a Pix charge. Returning.");
    return { statusCode: 200 };
  }

  console.log("This is a pix charge!");
  console.log(attributes.code);
  console.log(attributes.pix.txid);

  return { statusCode: 200 };
};

module.exports = { handler };
