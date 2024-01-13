const { User, ParkingSpace } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    // Get parking spaces, optionally filtered by user ID
    parkingSpaces: async (parent, { userId }) => {
      const query = userId ? { user: userId } : {};
      return await ParkingSpace.find(query).populate('user');
    },
    // Get a single parking space by name
    parkingSpace: async (parent, { name }) => {
      return await ParkingSpace.findOne({ name }).populate('user');
    },
    // Get the logged-in user
    me: async (parent, args, context) => {
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
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('User already exists with this username');
      }
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    // Add a new parking space
    addParkingSpace: async (parent, { name, hourlyRate = 10, user: userId }) => {
      const existingSpace = await ParkingSpace.findOne({ name });
      if (existingSpace) {
        throw new Error('Parking space already exists with this name');
      }
    
      const newSpace = {
        name,
        hourlyRate,
        user: userId,
        customerName: '',
        customerContact: '',
        carMake: '',
        carModel: '',
        parkedAt: null,
        leftAt: null,
        isOccupied: false
      };
    
      return await ParkingSpace.create(newSpace);
    },

    
    
    // Update a parking space with car and customer details
updateParkingSpace: async (parent, { id, customerName, customerContact, carMake, carModel, parkedAt }) => {
  console.log(`Updating parking space: ${id} with data:`, { customerName, customerContact, carMake, carModel, parkedAt });

  try {
    // Check if at least one of the fields is provided
    if (!customerName && !customerContact && !carMake && !carModel) {
      throw new Error('At least one field (customerName, customerContact, carMake, carModel) must be provided');
    }

    const updateData = { customerName, customerContact, carMake, carModel, isOccupied: true };
    if (parkedAt) {
      updateData.parkedAt = new Date(parkedAt);
    }

    const updatedSpace = await ParkingSpace.findOneAndUpdate(
      { _id: id }, // Use _id for finding the document
      updateData,
      { new: true }
    );

    if (!updatedSpace) {
      console.log(`Parking space not found or update failed for: ${id}`);
      return null;
    }

    console.log(`Parking space updated successfully:`, updatedSpace);
    return updatedSpace;
  } catch (error) {
    console.error(`Error updating parking space: ${id}`, error);
    throw new Error('Error updating parking space');
  }
},

    // Remove a car from a parking space
    removeCarFromParkingSpace: async (parent, { name }) => {
      return await ParkingSpace.findOneAndUpdate(
        { name },
        { customerName: '', customerContact: '', carMake: '', carModel: '', parkedAt: null, leftAt: new Date(), isOccupied: false },
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
      if (hours <= 0) {
        throw new Error('Invalid hours');
      }
      const amount = parkingSpace.hourlyRate * hours * 100; // Amount in cents
      try {
        const charge = await stripe.charges.create({ amount, currency: 'usd', source: sourceToken, description: `Charge for ${hours} hours at ${parkingSpace.name}` });
        await ParkingSpace.findOneAndUpdate({ _id: parkingSpace._id }, { isOccupied: false, leftAt: new Date() });
        return { success: true, chargeId: charge.id };
      } catch (error) {
        console.error('Payment processing error:', error);
        throw new Error('Payment processing failed');
      }
    },
  },
};

module.exports = resolvers;