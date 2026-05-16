require('dotenv').config();
const mongoose = require('mongoose');
const Ride = require('./models/Ride');
const Booking = require('./models/Booking');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ridego';

const rides = [
  { type: 'Bike',  emoji: '🏍️', capacity: 1, baseFare: 25, perKm: 8,  eta: '3 mins' },
  { type: 'Auto',  emoji: '🛺',  capacity: 3, baseFare: 40, perKm: 12, eta: '5 mins' },
  { type: 'Cab',   emoji: '🚗',  capacity: 4, baseFare: 80, perKm: 18, eta: '7 mins' },
];

const DISTANCES = {
  Pune: 148,
  Nashik: 167,
  Nagpur: 824,
  Aurangabad: 335,
  Lonavala: 83,
  Shirdi: 240,
};

const drivers = [
  { name: 'Ravi K.', rating: 4.9 },
  { name: 'Suresh M.', rating: 4.7 },
  { name: 'Priya S.', rating: 4.8 },
  { name: 'Ajay R.', rating: 4.6 },
];

const bookings = [
  {
    destination: 'Pune',
    rideType: 'Cab',
    fare: 80 + 18 * 148,
    status: 'completed',
    driverName: 'Ravi K.',
    vehicleNo: 'MH 12 AB 4521',
    rating: 4.9,
    createdAt: new Date('2026-05-10T08:30:00'),
  },
  {
    destination: 'Lonavala',
    rideType: 'Bike',
    fare: 25 + 8 * 83,
    status: 'completed',
    driverName: 'Priya S.',
    vehicleNo: 'MH 04 EF 7832',
    rating: 4.8,
    createdAt: new Date('2026-05-11T14:15:00'),
  },
  {
    destination: 'Nashik',
    rideType: 'Auto',
    fare: 40 + 12 * 167,
    status: 'confirmed',
    driverName: 'Suresh M.',
    vehicleNo: 'MH 01 CD 3290',
    rating: 4.7,
    createdAt: new Date('2026-05-14T09:00:00'),
  },
  {
    destination: 'Nagpur',
    rideType: 'Cab',
    fare: 80 + 18 * 824,
    status: 'completed',
    driverName: 'Ajay R.',
    vehicleNo: 'MH 14 GH 6104',
    rating: 4.6,
    createdAt: new Date('2026-05-12T17:45:00'),
  },
  {
    destination: 'Aurangabad',
    rideType: 'Auto',
    fare: 40 + 12 * 335,
    status: 'cancelled',
    driverName: 'Ravi K.',
    vehicleNo: 'MH 12 AB 8811',
    rating: 4.9,
    createdAt: new Date('2026-05-13T11:20:00'),
  },
  {
    destination: 'Shirdi',
    rideType: 'Bike',
    fare: 25 + 8 * 240,
    status: 'completed',
    driverName: 'Priya S.',
    vehicleNo: 'MH 04 EF 5567',
    rating: 4.8,
    createdAt: new Date('2026-05-15T06:10:00'),
  },
  {
    destination: 'Pune',
    rideType: 'Auto',
    fare: 40 + 12 * 148,
    status: 'confirmed',
    driverName: 'Suresh M.',
    vehicleNo: 'MH 01 CD 9943',
    rating: 4.7,
    createdAt: new Date(),
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    // Seed rides
    await Ride.deleteMany({});
    console.log('Old rides cleared.');
    await Ride.insertMany(rides);
    console.log('✅ Rides seeded successfully!');
    console.table(rides.map(r => ({ type: r.type, baseFare: r.baseFare, perKm: r.perKm })));

    // Seed bookings
    await Booking.deleteMany({});
    console.log('Old bookings cleared.');
    await Booking.insertMany(bookings);
    console.log('✅ Bookings seeded successfully!');
    console.table(bookings.map(b => ({
      destination: b.destination,
      rideType: b.rideType,
      fare: b.fare,
      status: b.status,
      driver: b.driverName,
    })));
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seed();
