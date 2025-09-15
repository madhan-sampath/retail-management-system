const { Report } = require('../models');

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReport = async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (report) {
      res.json(report);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (report) {
      await Report.update(req.body, { where: { id: req.params.id } });
      const updatedReport = await Report.findByPk(req.params.id);
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (report) {
      await Report.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
