const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/myParkingLotApp');

module.exports = mongoose.connection;

