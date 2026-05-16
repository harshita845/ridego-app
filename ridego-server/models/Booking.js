const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  rideType: { type: String, required: true },
  fare: { type: Number, required: true },
  status: { type: String, default: 'confirmed' },
  driverName: { type: String },
  vehicleNo: { type: String },
  rating: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
