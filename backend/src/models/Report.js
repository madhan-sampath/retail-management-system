const LocalModel = require("./LocalModel");

class Report extends LocalModel {
  constructor() {
    super("Reports", "id");
  }
}

module.exports = Report;
