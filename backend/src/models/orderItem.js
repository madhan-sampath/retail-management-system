const LocalModel = require("./LocalModel");

class OrderItem extends LocalModel {
  constructor() {
    super("Order_Items", "item_id");
  }
}

module.exports = OrderItem;
