const { User } = require("../models");

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    // Filter out password_hash for security
    const safeUsers = users.map(user => ({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role_id: user.role_id
    }));
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password_hash, email, role_id } = req.body;
    const newUser = await User.create({ username, password_hash, email, role_id });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Filter out password_hash for security
    const safeUser = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      role_id: user.role_id
    };
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update user
exports.updateUser = async (req, res) => {
  try {
    const { username, email, role_id } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.update({ username, email, role_id }, { where: { user_id: req.params.id } });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await User.destroy({ where: { user_id: req.params.id } });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
