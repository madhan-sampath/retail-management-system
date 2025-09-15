const LocalModel = require("./LocalModel");

class Role extends LocalModel {
  constructor() {
    super("Roles", "role_id");
  }
}

module.exports = Role;
