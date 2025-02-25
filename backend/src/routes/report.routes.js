const express = require('express');
const router = express.Router();
const { Report } = require('../models'); // Assuming you registered Report in models

// Example route
router.get('/', async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

module.exports = router;
