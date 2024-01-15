const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
  }

  type ParkingSpace {
    _id: ID
    name: String
    customerName: String
    customerContact: String
    carMake: String
    carModel: String
    parkedAt: String
    leftAt: String
    isOccupied: Boolean
    hourlyRate: Float
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    parkingSpaces(userId: ID): [ParkingSpace]
    parkingSpace(name: String!): ParkingSpace
  }

  type PaymentResult {
    success: Boolean
    chargeId: String
    amountCharged: Float
    message: String
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addParkingSpace(name: String!, hourlyRate: Float, user: ID!): ParkingSpace
    updateParkingSpace(id: ID!, customerName: String, customerContact: String, carMake: String, carModel: String, parkedAt: String): ParkingSpace
    removeCarFromParkingSpace(name: String!): ParkingSpace
    updateHourlyRate(name: String!, hourlyRate: Float!): ParkingSpace
    processPayment(name: String!, hours: Int!, sourceToken: String!): PaymentResult
  }
`;

module.exports = typeDefs;


