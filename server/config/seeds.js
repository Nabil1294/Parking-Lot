const db = require('./connection');
const { User, ParkingSpace } = require('../models');
const cleanDB = require('./cleanDB');
const { formatISO } = require('date-fns');

db.once('open', async () => {
    try {
        await cleanDB('users');
        await cleanDB('parkingspaces');

        const users = await User.create([
            { username: 'Sal', password: 'password123' },
            { username: 'Amiko', password: 'password123' }
        ]);
        console.log('Users seeded');

        await ParkingSpace.create([
            { name: 'A1', hourlyRate: 10, user: users[0]._id },
            { name: 'A2', hourlyRate: 10, isOccupied: true, customerName: 'John', customerContact: '1234567890', carMake: 'Toyota', carModel: 'Camry', parkedAt: new Date('2024-01-10T08:00:00.000Z').toISOString(), user: users[0]._id },
            { name: 'B1', hourlyRate: 10, user: users[1]._id },
            { name: 'B2', hourlyRate: 10, isOccupied: true, customerName: 'Adam', customerContact: '1234567890', carMake: 'Honda', carModel: 'Civic', parkedAt: new Date('2024-01-10T09:00:00.000Z').toISOString(), user: users[1]._id }
        ]);
        console.log('Parking spaces seeded');

    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }

    process.exit();
});

