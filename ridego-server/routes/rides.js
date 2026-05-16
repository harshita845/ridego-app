const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// GET /api/rides — return all ride tiers
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find({});
    res.json(rides);
  } catch (err) {
    console.error('Error fetching rides:', err);
    res.status(500).json({ error: 'Failed to fetch rides' });
  }
});

module.exports = router;
