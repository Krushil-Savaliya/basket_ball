const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: String,
  content: String,
  category: {
    type: String,
    enum: ['Game Recap', 'Trade News', 'Awards', 'Injuries', 'All-Star', 'Analytics'],
    default: 'Game Recap'
  },
  author: String,
  image: String,
  trending: { type: Boolean, default: false },
  tags: [String],
  publishedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);