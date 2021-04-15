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

  async recordOrUpdatePixCharge(charge) {
    // Update charge. If it does not exist, create it
    try {
      await this.client.query(
        query.Update(
          query.Select(
            ["ref"],
            query.Get(query.Match(query.Index("pixCode"), charge.pixCode))
          ),
          { data: charge }
        )
      );
    } catch (error) {
      console.log("Document not found. Creating one.");
      await this.recordCharge(charge);
    }
  }

  async updateChargeStatus(chargeCode, status) {
    try {
      await this.client.query(
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
      if (error.errorType == "NotFound") {
        console.log("Can't find entry.");
      }
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

  async isPaid(txid) {
    try {
      const response = await this.client.query(
        query.Get(query.Match(query.Index("pixCode"), txid))
      );
      return {
        isPaid: response.data.status == "PAID",
        chargeCode: response.data.chargeCode,
      };
    } catch (error) {
      console.log("An error occurred while fetching: ", error);
      return false;
    }
  }

  async swapTxidByChargeCode(pixCode, chargeCode) {
    try {
      await this.client.query(
        query.Update(
          query.Select(
            ["ref"],
            query.Get(query.Match(query.Index("pixCode"), pixCode))
          ),
          {
            data: { chargeCode },
          }
        )
      );
      console.log("Succesfully updated charge codes.");
    } catch (error) {
      console.log("Document not found. Creating one.");
      await this.client.query(
        query.Create(query.Collection("doar-payments"), {
          data: { pixCode, chargeCode },
        })
      );
    }
  }
}

module.exports = { Fauna };
