require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const ridesRouter = require('./routes/rides');
const bookingsRouter = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ridego';

// Middleware
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/rides', ridesRouter);
app.use('/api/bookings', bookingsRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 fallback
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Connect to MongoDB then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
