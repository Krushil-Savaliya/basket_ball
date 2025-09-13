const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news
router.get('/', async (req, res) => {
  try {
    const { category, trending, limit = 20 } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (trending) query.trending = trending === 'true';
    
    const news = await News.find(query)
      .sort({ publishedAt: -1 })
      .limit(parseInt(limit));
      
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get trending news
router.get('/trending', async (req, res) => {
  try {
    const trendingNews = await News.find({ trending: true })
      .sort({ publishedAt: -1 })
      .limit(10);
      
    res.json(trendingNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create news article
router.post('/', async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;