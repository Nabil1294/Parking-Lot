const db = require('./connection');
const { User, ParkingSpace } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  // Clean existing data
  await cleanDB('User', 'users');
  await cleanDB('ParkingSpace', 'parkingspaces');

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
    { name: 'A2', hourlyRate: 10 },
    { name: 'B1', hourlyRate: 10 },
    { name: 'B2', hourlyRate: 10 },
  ]);

  console.log('Parking spaces seeded');

  process.exit();
});