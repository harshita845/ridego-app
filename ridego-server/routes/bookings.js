const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Ride = require('../models/Ride');

// Fixed distances (km) from Mumbai
const DISTANCES = {
  Pune: 148,
  Nashik: 167,
  Nagpur: 824,
  Aurangabad: 335,
  Lonavala: 83,
  Shirdi: 240,
};

// Driver pool — randomly assigned
const DRIVERS = [
  { name: 'Ravi K.', rating: 4.9 },
  { name: 'Suresh M.', rating: 4.7 },
  { name: 'Priya S.', rating: 4.8 },
  { name: 'Ajay R.', rating: 4.6 },
];

const VEHICLE_PREFIXES = ['MH 12 AB', 'MH 01 CD', 'MH 04 EF', 'MH 14 GH'];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateVehicleNo = () => {
  const prefix = randomFrom(VEHICLE_PREFIXES);
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix} ${num}`;
};

// GET /api/bookings — return all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// POST /api/bookings — create a new booking
router.post('/', async (req, res) => {
  try {
    const { destination, rideType, fare: clientFare } = req.body;

    if (!destination || !rideType) {
      return res.status(400).json({ error: 'destination and rideType are required' });
    }

    // Fetch ride to recalculate fare server-side
    const ride = await Ride.findOne({ type: rideType });
    if (!ride) {
      return res.status(404).json({ error: `Ride type '${rideType}' not found` });
    }

    const distanceKm = DISTANCES[destination] || 100;
    const fare = ride.baseFare + ride.perKm * distanceKm;

    // Pick random driver and vehicle
    const driver = randomFrom(DRIVERS);
    const vehicleNo = generateVehicleNo();

    const booking = await Booking.create({
      destination,
      rideType,
      fare,
      status: 'confirmed',
      driverName: driver.name,
      vehicleNo,
      rating: driver.rating,
    });

    res.status(201).json({
      bookingId: booking._id,
      driverName: booking.driverName,
      vehicleNo: booking.vehicleNo,
      rating: booking.rating,
      status: booking.status,
      fare: booking.fare,
    });
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET /api/bookings/:id — get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

module.exports = router;
