const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/myParkingLotApp');
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

module.exports = mongoose.connection;

