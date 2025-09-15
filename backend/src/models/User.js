const LocalModel = require("./LocalModel");

class User extends LocalModel {
  constructor() {
    super("Users", "user_id");
  }
}

module.exports = User;
