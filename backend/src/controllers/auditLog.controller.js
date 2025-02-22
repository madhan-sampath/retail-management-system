const { User } = require("../models");
const AuditLog = require("../models/AuditLog");

// ✅ Get all audit logs
exports.getAllAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({ include: User });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audit logs", error });
  }
};

// ✅ Get a single audit log by ID
exports.getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findByPk(req.params.id, { include: User });
    if (!log) return res.status(404).json({ message: "Audit log not found" });
    res.json(log);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audit log", error });
  }
};

// ✅ Create a new audit log
exports.createAuditLog = async (req, res) => {
  try {
    const { user_id, action, description } = req.body;

    // Ensure user exists before logging an action
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const log = await AuditLog.create({ user_id, action, description });

    res.status(201).json({ message: "Audit log created successfully", log });
  } catch (error) {
    res.status(500).json({ message: "Error creating audit log", error });
  }
};

// ✅ Delete an audit log
exports.deleteAuditLog = async (req, res) => {
  try {
    const log = await AuditLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: "Audit log not found" });

    await log.destroy();
    res.json({ message: "Audit log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting audit log", error });
  }
};
