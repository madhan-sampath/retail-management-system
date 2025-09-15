const LocalModel = require("./LocalModel");

class Category extends LocalModel {
  constructor() {
    super("Categories", "category_id");
  }
}

module.exports = Category;
