const LocalModel = require("./LocalModel");

class Inventory extends LocalModel {
  constructor() {
    super("Inventory", "inventory_id");
  }
}

module.exports = Inventory;
