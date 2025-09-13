const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const aiCommentaryService = require('./services/aiCommentary');
const playerTrackingService = require('./services/playerTracking');

// Import routes
const gamesRoutes = require('./routes/games');
const playersRoutes = require('./routes/players');
const teamsRoutes = require('./routes/teams');
const newsRoutes = require('./routes/news');
const injuriesRoutes = require('./routes/injuries');
const liveGamesRoutes = require('./routes/liveGames');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Make io available to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/games', gamesRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/injuries', injuriesRoutes);
app.use('/api/live-games', liveGamesRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('joinGame', (gameId) => {
    socket.join(`game_${gameId}`);
    console.log(`Client ${socket.id} joined game ${gameId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Simulate live game updates
const simulateLiveUpdates = () => {
  setInterval(async () => {
    try {
      // Simulate live commentary generation
      const gameId = 'live_game_1';
      const gameData = {
        gameTime: { quarter: 3, minutes: 8, seconds: 45 },
        lastScorer: Math.random() < 0.5 ? 'LeBron James +2' : 'Stephen Curry +3'
      };
      
      await aiCommentaryService.generateLiveCommentary(gameId, gameData);
      
      // Simulate player tracking updates
      const playerId = 'lebron23';
      const movementData = {
        gameId: gameId,
        coordinates: [
          { x: Math.random() * 100, y: Math.random() * 100, timestamp: Date.now() }
        ],
        gestures: [
          {
            gesture: 'Jump Shot',
            confidence: 85 + Math.random() * 15,
            timestamp: new Date()
          }
        ],
        events: [{ reactionTime: 0.2 + Math.random() * 0.1 }],
        decisions: [{ outcome: Math.random() < 0.7 ? 'positive' : 'negative' }]
      };
      
      const trackingResult = await playerTrackingService.analyzePlayerMovement(playerId, movementData);
      
      // Emit updates to connected clients
      io.emit('liveUpdate', {
        type: 'commentary',
        gameId: gameId,
        data: gameData
      });
      
      io.emit('trackingUpdate', {
        playerId: playerId,
        data: trackingResult.analysis
      });
      
    } catch (error) {
      console.error('Error in live updates:', error);
    }
  }, 5000); // Update every 5 seconds
};

// Start live updates simulation
simulateLiveUpdates();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'BASKMANIAC API is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🏀 BASKMANIAC Server running on port ${PORT}`);
  console.log(`📊 MongoDB connected and ready`);
  console.log(`🤖 AI Commentary Service active`);
  console.log(`📡 Real-time updates enabled`);
});