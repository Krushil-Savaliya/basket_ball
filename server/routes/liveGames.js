const express = require('express');
const router = express.Router();
const betsApiService = require('../services/betsApiService');
const Game = require('../models/Game');

// Get live games from BetsAPI
router.get('/live', async (req, res) => {
  try {
    const liveGames = await betsApiService.getInplayGames();
    
    // Update database with live games
    for (const game of liveGames) {
      await Game.findOneAndUpdate(
        { gameId: game.gameId },
        game,
        { upsert: true, new: true }
      );
    }
    
    res.json({
      success: true,
      games: liveGames,
      count: liveGames.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      games: []
    });
  }
});

// Get upcoming games
router.get('/upcoming', async (req, res) => {
  try {
    const upcomingGames = await betsApiService.getUpcomingGames();
    
    res.json({
      success: true,
      games: upcomingGames,
      count: upcomingGames.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      games: []
    });
  }
});

// Get specific game details
router.get('/game/:gameId', async (req, res) => {
  try {
    const gameDetails = await betsApiService.getGameDetails(req.params.gameId);
    
    if (gameDetails) {
      // Update database
      await Game.findOneAndUpdate(
        { gameId: gameDetails.gameId },
        gameDetails,
        { upsert: true, new: true }
      );
      
      res.json({
        success: true,
        game: gameDetails
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Game not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Sync all games (live + upcoming)
router.post('/sync', async (req, res) => {
  try {
    const syncResult = await betsApiService.syncLiveGames();
    
    res.json({
      success: true,
      message: 'Games synchronized successfully',
      data: syncResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;