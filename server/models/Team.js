const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  logo: String,
  conference: {
    type: String,
    enum: ['Eastern', 'Western']
  },
  city: String,
  founded: Number,
  championships: { type: Number, default: 0 },
  record: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    winPercentage: { type: Number, default: 0 }
  },
  streak: String,
  lastGames: [Boolean] // Array of last 5 games (true = win, false = loss)
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);