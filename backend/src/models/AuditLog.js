const LocalModel = require("./LocalModel");

class AuditLog extends LocalModel {
  constructor() {
    super("audit_logs", "log_id");
  }
}

module.exports = AuditLog;
