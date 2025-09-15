const LocalModel = require("./LocalModel");

class Payment extends LocalModel {
  constructor() {
    super("Payments", "payment_id");
  }
}

module.exports = Payment;
