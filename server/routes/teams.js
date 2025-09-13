const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// Get all teams
router.get('/', async (req, res) => {
  try {
    const { conference } = req.query;
    let query = {};
    
    if (conference) query.conference = conference;
    
    const teams = await Team.find(query).sort({ 'record.winPercentage': -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team standings
router.get('/standings', async (req, res) => {
  try {
    const { conference } = req.query;
    let query = {};
    
    if (conference) query.conference = conference;
    
    const standings = await Team.find(query)
      .sort({ 'record.winPercentage': -1 })
      .select('name conference record streak lastGames');
      
    res.json(standings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team by ID
router.get('/:teamId', async (req, res) => {
  try {
    const team = await Team.findOne({ teamId: req.params.teamId });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update team record
router.put('/:teamId/record', async (req, res) => {
  try {
    const { wins, losses } = req.body;
    const winPercentage = wins / (wins + losses);
    
    const team = await Team.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        'record.wins': wins,
        'record.losses': losses,
        'record.winPercentage': winPercentage
      },
      { new: true }
    );
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;