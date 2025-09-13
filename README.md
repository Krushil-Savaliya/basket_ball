# BASKMANIAC - Basketball Live Score & Commentary Platform

A comprehensive basketball analytics platform featuring real-time live scores, AI-powered commentary, player tracking, and advanced basketball analytics.

## 🏀 Features

- **Live Score Tracking** - Real-time game scores with minimal delay
- **AI-Powered Commentary** - Intelligent commentary generation using basketball rules
- **Player Movement Tracking** - Gesture recognition and movement analysis
- **Team & Player Management** - Comprehensive team and player statistics
- **Injury Reports** - Real-time injury tracking and updates
- **Basketball News** - Latest news and updates from the basketball world
- **Advanced Analytics** - Performance metrics and insights

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB with Mongoose
- **AI/ML**: Custom AI services for commentary and player tracking
- **Real-time**: WebSocket connections for live updates

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd baskmaniac
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use MongoDB Atlas

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development servers**
   ```bash
   npm run dev:full
   ```

## 🚀 Usage

### Frontend Development
```bash
npm run dev
```
Access the frontend at `http://localhost:5173`

### Backend Development
```bash
npm run server
```
API server runs on `http://localhost:5000`

### Full Development (Frontend + Backend)
```bash
npm run dev:full
```

## 📊 Database Schema

### Collections:
- **games** - Live and historical game data
- **players** - Player profiles and statistics
- **teams** - Team information and records
- **commentaries** - AI-generated commentary
- **news** - Basketball news articles
- **injuries** - Injury reports and status
- **playertrackings** - Movement and gesture data

## 🤖 AI Features

### Commentary Generation
- Real-time analysis of game events
- Basketball rule-based commentary
- Context-aware narrative generation
- Confidence scoring for AI predictions

### Player Tracking
- Gesture recognition (Jump Shot, Crossover, Layup, etc.)
- Movement efficiency analysis
- Reaction time measurement
- Court vision assessment

## 📡 API Endpoints

### Games
- `GET /api/games` - Get all games
- `GET /api/games/live` - Get live games
- `GET /api/games/:gameId` - Get specific game
- `PUT /api/games/:gameId/score` - Update game score

### Players
- `GET /api/players` - Get all players
- `GET /api/players/:playerId` - Get specific player
- `PUT /api/players/:playerId/tracking` - Update player tracking

### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/standings` - Get team standings

### News & Injuries
- `GET /api/news` - Get basketball news
- `GET /api/injuries` - Get injury reports

## 🔄 Real-time Features

The application uses Socket.IO for real-time updates:
- Live score updates
- Commentary feed
- Player tracking data
- Injury status changes

## 🎯 Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── server/                # Backend Node.js application
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # AI and business logic
│   └── scripts/           # Database scripts
└── public/                # Static assets
```

## 🏆 Final Year Project Features

This platform demonstrates:
- **Real-time Data Processing** - Live score and commentary updates
- **Machine Learning Integration** - AI-powered commentary and player analysis
- **Database Design** - Comprehensive MongoDB schema for basketball data
- **API Development** - RESTful APIs with real-time capabilities
- **Modern Frontend** - React with TypeScript and responsive design
- **Analytics Dashboard** - Power BI integration ready

## 📈 Future Enhancements

- Integration with real NBA APIs
- Advanced ML models for prediction
- Mobile application development
- Video analysis integration
- Social features and user engagement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- NBA for basketball data inspiration
- Basketball Reference for statistical formats
- React and Node.js communities for excellent documentation