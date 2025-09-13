const express = require('express');
const router = express.Router();
const Injury = require('../models/Injury');

// Get all injuries
router.get('/', async (req, res) => {
  try {
    const { team, status, severity } = req.query;
    let query = {};
    
    if (team) query.team = team;
    if (status) query.status = status;
    if (severity) query.severity = severity;
    
    const injuries = await Injury.find(query).sort({ dateInjured: -1 });
    res.json(injuries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create injury report
router.post('/', async (req, res) => {
  try {
    const injury = new Injury(req.body);
    await injury.save();
    res.status(201).json(injury);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update injury status
router.put('/:id', async (req, res) => {
  try {
    const injury = await Injury.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!injury) {
      return res.status(404).json({ message: 'Injury report not found' });
    }
    
    res.json(injury);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;