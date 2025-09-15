const { Role } = require("../models");

// ✅ Get all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a new role
exports.createRole = async (req, res) => {
  try {
    const { role_name, description } = req.body;
    const newRole = await Role.create({ role_name, description });
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update role
exports.updateRole = async (req, res) => {
  try {
    const { role_name, description } = req.body;
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    await Role.update({ role_name, description }, { where: { role_id: req.params.id } });
    res.json({ message: "Role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    await Role.destroy({ where: { role_id: req.params.id } });
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
