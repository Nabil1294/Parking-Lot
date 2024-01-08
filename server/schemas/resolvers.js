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
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('User already exists with this username');
      }

      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },

    // Add a new parking space
    addParkingSpace: async (parent, { name }) => {
      // Check if parking space already exists
      const existingSpace = await ParkingSpace.findOne({ name });
      if (existingSpace) {
        throw new Error('Parking space already exists with this name');
      }

      return await ParkingSpace.create({ name });
    },

    // Update a parking space with car and customer details
    updateParkingSpace: async (parent, { name, customerName, customerContact, carMake, carModel }) => {
      return await ParkingSpace.findOneAndUpdate(
        { name },
        { customerName, customerContact, carMake, carModel, parkedAt: new Date(), isOccupied: true },
        { new: true }
      );
    },

    // Remove a car from a parking space
    removeCarFromParkingSpace: async (parent, { name }) => {
      return await ParkingSpace.findOneAndUpdate(
        { name },
        {
          customerName: '',
          customerContact: '',
          carMake: '',
          carModel: '',
          parkedAt: null,
          leftAt: new Date(),
          isOccupied: false
        },
        { new: true }
      );
    },

    // Process payment (Stripe integration)
    processPayment: async (parent, { name, hours, sourceToken }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const parkingSpace = await ParkingSpace.findOne({ name });
      if (!parkingSpace || !parkingSpace.isOccupied) {
        throw new Error('Parking space not occupied');
      }

      const amount = parkingSpace.hourlyRate * hours * 100; // Amount in cents

      // Create Stripe charge
      const charge = await stripe.charges.create({
        amount,
        currency: 'usd',
        source: sourceToken, // Token from frontend
        description: `Charge for ${hours} hours at ${parkingSpace.name}`,
      });


      return { success: true, chargeId: charge.id };
    },
  },
};

module.exports = resolvers;