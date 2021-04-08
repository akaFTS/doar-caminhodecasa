const process = require("process");
const { query, Client } = require("faunadb");

class Fauna {
  constructor() {
    this.client = new Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
    });
  }

  async recordCharge(charge) {
    try {
      return this.client.query(
        query.Create(query.Collection("doar-payments"), { data: charge })
      );
    } catch (error) {
      console.log("An error occurred while recording: ", error);
    }
  }

  async updateCharge(chargeCode, status) {
    try {
      return this.client.query(
        query.Update(
          query.Select(
            ["ref"],
            query.Get(query.Match(query.Index("chargeCode"), chargeCode))
          ),
          {
            data: { status },
          }
        )
      );
    } catch (error) {
      console.log("An error occurred while updating: ", error);
    }
  }

  async fetchCharge(chargeCode) {
    try {
      const response = await this.client.query(
        query.Get(query.Match(query.Index("chargeCode"), chargeCode))
      );
      return response.data;
    } catch (error) {
      console.log("An error occurred while fetching: ", error);
      return null;
    }
  }
}

module.exports = { Fauna };
