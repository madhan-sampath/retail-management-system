const LocalModel = require("./LocalModel");

class Product extends LocalModel {
  constructor() {
    super("Products", "product_id");
  }
}

module.exports = Product;
