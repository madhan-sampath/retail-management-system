const LocalModel = require("./LocalModel");

class Customer extends LocalModel {
  constructor() {
    super("Customers", "customer_id");
  }
}

module.exports = Customer;
