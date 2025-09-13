const mongoose = require('mongoose');
require('dotenv').config();

const Game = require('../models/Game');
const Player = require('../models/Player');
const Team = require('../models/Team');
const News = require('../models/News');
const Injury = require('../models/Injury');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedTeams = async () => {
  const teams = [
    {
      teamId: 'lakers',
      name: 'Los Angeles Lakers',
      logo: '🏀',
      conference: 'Western',
      city: 'Los Angeles',
      founded: 1947,
      championships: 17,
      record: { wins: 28, losses: 15, winPercentage: 0.651 },
      streak: 'W2',
      lastGames: [true, true, false, true, true]
    },
    {
      teamId: 'warriors',
      name: 'Golden State Warriors',
      logo: '⚡',
      conference: 'Western',
      city: 'San Francisco',
      founded: 1946,
      championships: 7,
      record: { wins: 25, losses: 18, winPercentage: 0.581 },
      streak: 'L1',
      lastGames: [false, true, true, false, true]
    },
    {
      teamId: 'celtics',
      name: 'Boston Celtics',
      logo: '🍀',
      conference: 'Eastern',
      city: 'Boston',
      founded: 1946,
      championships: 18,
      record: { wins: 32, losses: 11, winPercentage: 0.744 },
      streak: 'W3',
      lastGames: [true, true, true, false, true]
    }
  ];

  await Team.deleteMany({});
  await Team.insertMany(teams);
  console.log('Teams seeded successfully');
};

const seedPlayers = async () => {
  const players = [
    {
      playerId: 'lebron23',
      name: 'LeBron James',
      team: 'Los Angeles Lakers',
      position: 'SF',
      age: 39,
      height: '6\'9"',
      weight: '250 lbs',
      photo: '👑',
      stats: { ppg: 25.2, rpg: 7.8, apg: 6.9, fg: 0.485 },
      status: 'Active',
      tracking: {
        speed: 18.5,
        shotAccuracy: 89,
        movementEfficiency: 76,
        gestureScore: 92,
        reactionTime: 0.23,
        courtVision: 85
      }
    },
    {
      playerId: 'curry30',
      name: 'Stephen Curry',
      team: 'Golden State Warriors',
      position: 'PG',
      age: 36,
      height: '6\'2"',
      weight: '185 lbs',
      photo: '👨‍🦱',
      stats: { ppg: 26.8, rpg: 4.3, apg: 5.1, fg: 0.413 },
      status: 'Active',
      tracking: {
        speed: 20.2,
        shotAccuracy: 94,
        movementEfficiency: 88,
        gestureScore: 96,
        reactionTime: 0.19,
        courtVision: 92
      }
    }
  ];

  await Player.deleteMany({});
  await Player.insertMany(players);
  console.log('Players seeded successfully');
};

const seedGames = async () => {
  const games = [
    {
      gameId: 'live_game_1',
      homeTeam: { name: 'Lakers', score: 87, logo: '🏀' },
      awayTeam: { name: 'Warriors', score: 92, logo: '⚡' },
      gameTime: { quarter: 3, minutes: 8, seconds: 45 },
      status: 'live',
      venue: 'Crypto.com Arena',
      date: new Date(),
      tv: 'ESPN',
      stats: { leadChanges: 15, accuracy: 92 },
      lastScorer: 'Stephen Curry +3'
    }
  ];

  await Game.deleteMany({});
  await Game.insertMany(games);
  console.log('Games seeded successfully');
};

const seedNews = async () => {
  const news = [
    {
      title: 'Lakers Secure Victory in Overtime Thriller Against Warriors',
      summary: 'LeBron James delivers clutch performance with 35 points as Lakers win 127-123 in overtime.',
      category: 'Game Recap',
      author: 'ESPN Staff',
      image: '🏀',
      trending: true,
      tags: ['Lakers', 'Warriors', 'LeBron James', 'Overtime']
    },
    {
      title: 'NBA Trade Deadline: Top Players Expected to Move',
      summary: 'Several All-Star players are reportedly available as teams prepare for the February trade deadline.',
      category: 'Trade News',
      author: 'Adrian Wojnarowski',
      image: '📰',
      trending: true,
      tags: ['Trade Deadline', 'NBA', 'All-Star']
    }
  ];

  await News.deleteMany({});
  await News.insertMany(news);
  console.log('News seeded successfully');
};

const seedInjuries = async () => {
  const injuries = [
    {
      player: 'Anthony Davis',
      team: 'Los Angeles Lakers',
      position: 'PF/C',
      injury: 'Right Ankle Sprain',
      status: 'Day-to-Day',
      expectedReturn: '2-3 days',
      severity: 'Minor',
      dateInjured: new Date('2024-01-12')
    }
  ];

  await Injury.deleteMany({});
  await Injury.insertMany(injuries);
  console.log('Injuries seeded successfully');
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    await seedTeams();
    await seedPlayers();
    await seedGames();
    await seedNews();
    await seedInjuries();
    
    console.log('✅ Database seeded successfully!');
    console.log('🏀 BASKMANIAC database is ready for use');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();