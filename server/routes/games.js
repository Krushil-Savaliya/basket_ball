const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const Commentary = require('../models/Commentary');

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort({ date: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get live games
router.get('/live', async (req, res) => {
  try {
    const liveGames = await Game.find({ status: 'live' });
    res.json(liveGames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get game by ID
router.get('/:gameId', async (req, res) => {
  try {
    const game = await Game.findOne({ gameId: req.params.gameId });
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update game score
router.put('/:gameId/score', async (req, res) => {
  try {
    const { homeScore, awayScore, gameTime, lastScorer } = req.body;
    
    const game = await Game.findOneAndUpdate(
      { gameId: req.params.gameId },
      {
        'homeTeam.score': homeScore,
        'awayTeam.score': awayScore,
        gameTime,
        lastScorer
      },
      { new: true }
    );
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    // Emit real-time update via Socket.IO
    req.io.emit('scoreUpdate', game);
    
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get game commentary
router.get('/:gameId/commentary', async (req, res) => {
  try {
    const commentary = await Commentary.find({ gameId: req.params.gameId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(commentary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add commentary
router.post('/:gameId/commentary', async (req, res) => {
  try {
    const commentary = new Commentary({
      gameId: req.params.gameId,
      ...req.body
    });
    
    await commentary.save();
    
    // Emit real-time commentary update
    req.io.emit('commentaryUpdate', commentary);
    
    res.status(201).json(commentary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;