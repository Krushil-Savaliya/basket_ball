const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await createIndexes();
    
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // Game indexes
    await mongoose.connection.collection('games').createIndex({ gameId: 1 });
    await mongoose.connection.collection('games').createIndex({ status: 1 });
    await mongoose.connection.collection('games').createIndex({ date: -1 });
    
    // Player indexes
    await mongoose.connection.collection('players').createIndex({ playerId: 1 });
    await mongoose.connection.collection('players').createIndex({ team: 1 });
    
    // Commentary indexes
    await mongoose.connection.collection('commentaries').createIndex({ gameId: 1 });
    await mongoose.connection.collection('commentaries').createIndex({ createdAt: -1 });
    
    // News indexes
    await mongoose.connection.collection('news').createIndex({ publishedAt: -1 });
    await mongoose.connection.collection('news').createIndex({ category: 1 });
    
    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

module.exports = connectDB;