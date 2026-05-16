const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  type: { type: String, required: true },      // 'Bike' | 'Auto' | 'Cab'
  emoji: { type: String, required: true },     // '🏍️' | '🛺' | '🚗'
  capacity: { type: Number, required: true },  // 1, 3, 4
  baseFare: { type: Number, required: true },  // 25, 40, 80
  perKm: { type: Number, required: true },     // 8, 12, 18
  eta: { type: String, required: true },       // '3 mins' | '5 mins' | '7 mins'
});

module.exports = mongoose.model('Ride', rideSchema);
