const LocalModel = require("./LocalModel");

class Supplier extends LocalModel {
  constructor() {
    super("Suppliers", "supplier_id");
  }
}

module.exports = Supplier;
