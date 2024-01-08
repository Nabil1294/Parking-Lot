const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  carOwnerName: {
    type: String,
    default: '',
  },
  carMake: {
    type: String,
    default: '',
  },
  carModel: {
    type: String,
    default: '',
  },
  parkedAt: {
    type: Date,
    default: null
  },
  leftAt: {
    type: Date,
    default: null
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  hourlyRate: {
    type: Number,
    default: 10
  }
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;