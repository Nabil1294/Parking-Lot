const { User, ParkingSpace } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    // Get all parking spaces
    parkingSpaces: async () => {
      return await ParkingSpace.find();
    },
    // Get a single parking space by name
    parkingSpace: async (parent, { name }) => {
      return await ParkingSpace.findOne({ name });
    },
    // Get the logged-in user
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    // User login
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    // Add new user
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    // Add a new parking space
    addParkingSpace: async (parent, { name }) => {
      return await ParkingSpace.create({ name });
    },
    // Update a parking space
    updateParkingSpace: async (parent, { name, carOwnerName, carMake, carModel }) => {
      return await ParkingSpace.findOneAndUpdate(
        { name },
        { carOwnerName, carMake, carModel, parkedAt: new Date(), isOccupied: true },
        { new: true }
      );
    },
    // Remove a car from a parking space
    removeCarFromParkingSpace: async (parent, { name }) => {
      return await ParkingSpace.findOneAndUpdate(
        { name },
        { carOwnerName: '', carMake: '', carModel: '', leftAt: new Date(), isOccupied: false },
        { new: true }
      );
    },
    // Process payment (Stripe integration)
    processPayment: async (parent, { name, hours }, context) => {
      if (context.user) {
        const parkingSpace = await ParkingSpace.findOne({ name });
        if (!parkingSpace || !parkingSpace.isOccupied) {
          throw new Error('Parking space not occupied');
        }

        const amount = parkingSpace.hourlyRate * hours * 100; // Amount in cents

        // Create Stripe charge
        const charge = await stripe.charges.create({
          amount,
          currency: 'usd',
          source: 'tok_visa', // Replace with real token from frontend
          description: `Charge for ${hours} hours at ${parkingSpace.name}`,
        });

        // Additional logic to handle post-payment (e.g., update parking space status)

        return { success: true, chargeId: charge.id };
      }

      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;