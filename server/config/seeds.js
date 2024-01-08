const db = require('./connection');
const { User, ParkingSpace } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean existing data
    await cleanDB('users');
    await cleanDB('parkingspaces');

    // Seed Users
    await User.create([
      {
        username: 'Sal',
        password: 'password123'
      },
      {
        username: 'Amiko',
        password: 'password123'
      }
    ]);
    console.log('Users seeded');

    // Seed Parking Spaces
    await ParkingSpace.create([
      { name: 'A1', hourlyRate: 10 },
      { name: 'A2', hourlyRate: 12, isOccupied: true, customerName: 'John', customerContact: '1234567890', carMake: 'Toyota', carModel: 'Camry' },
      { name: 'B1', hourlyRate: 8 },
      { name: 'B2', hourlyRate: 15, isOccupied: true, customerName: 'Adam', customerContact: '1234567890', carMake: 'Honda', carModel: 'civic' },
    ]);
    console.log('Parking spaces seeded');

  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1); // Exit with error code
  }

  process.exit();
});
