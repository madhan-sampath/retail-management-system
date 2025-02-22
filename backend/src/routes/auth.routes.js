const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models"); // ✅ Import from models/index.js

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "sampath@0000";

// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    const { username, password, email, role_id } = req.body;

    if (!username || !password || !email || !role_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Check for duplicate username
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password_hash: hashedPassword,
      email,
      role_id
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ User Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // ✅ Create JWT with role_id
    const token = jwt.sign(
      { userId: user.user_id, username: user.username, role_id: user.role_id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token, role_id: user.role_id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
