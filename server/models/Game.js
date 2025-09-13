const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true
  },
  homeTeam: {
    name: String,
    score: { type: Number, default: 0 },
    logo: String
  },
  awayTeam: {
    name: String,
    score: { type: Number, default: 0 },
    logo: String
  },
  gameTime: {
    quarter: { type: Number, default: 1 },
    minutes: { type: Number, default: 12 },
    seconds: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed'],
    default: 'upcoming'
  },
  venue: String,
  date: { type: Date, default: Date.now },
  tv: String,
  stats: {
    leadChanges: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 }
  },
  lastScorer: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);