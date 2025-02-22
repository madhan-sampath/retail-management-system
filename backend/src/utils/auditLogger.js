const AuditLog = require("../models/AuditLog");

const logAction = async (user_id, action, description) => {
  try {
    await AuditLog.create({ user_id, action, description });
  } catch (error) {
    console.error("Error logging action:", error);
  }
};

module.exports = logAction;
