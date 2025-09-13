const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const PlayerTracking = require('../models/PlayerTracking');

// Get all players
router.get('/', async (req, res) => {
  try {
    const { team, position, status } = req.query;
    let query = {};
    
    if (team) query.team = team;
    if (position) query.position = position;
    if (status) query.status = status;
    
    const players = await Player.find(query);
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get player by ID
router.get('/:playerId', async (req, res) => {
  try {
    const player = await Player.findOne({ playerId: req.params.playerId });
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update player tracking data
router.put('/:playerId/tracking', async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate(
      { playerId: req.params.playerId },
      { tracking: req.body },
      { new: true }
    );
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    // Save tracking history
    const trackingData = new PlayerTracking({
      playerId: req.params.playerId,
      metrics: req.body,
      gestures: req.body.gestures || [],
      aiAnalysis: req.body.aiAnalysis || {}
    });
    
    await trackingData.save();
    
    // Emit real-time tracking update
    req.io.emit('trackingUpdate', { playerId: req.params.playerId, data: req.body });
    
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get player tracking history
router.get('/:playerId/tracking/history', async (req, res) => {
  try {
    const { limit = 50, gameId } = req.query;
    let query = { playerId: req.params.playerId };
    
    if (gameId) query.gameId = gameId;
    
    const trackingHistory = await PlayerTracking.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));
      
    res.json(trackingHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;