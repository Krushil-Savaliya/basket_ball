const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  team: String,
  position: String,
  age: Number,
  height: String,
  weight: String,
  photo: String,
  stats: {
    ppg: { type: Number, default: 0 },
    rpg: { type: Number, default: 0 },
    apg: { type: Number, default: 0 },
    fg: { type: Number, default: 0 }
  },
  status: {
    type: String,
    enum: ['Active', 'Injured', 'Suspended'],
    default: 'Active'
  },
  tracking: {
    speed: { type: Number, default: 0 },
    shotAccuracy: { type: Number, default: 0 },
    movementEfficiency: { type: Number, default: 0 },
    gestureScore: { type: Number, default: 0 },
    reactionTime: { type: Number, default: 0 },
    courtVision: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);