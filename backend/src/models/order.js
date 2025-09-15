const LocalModel = require("./LocalModel");

class Order extends LocalModel {
  constructor() {
    super("Orders", "order_id");
  }
}

module.exports = Order;
