const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
  }

  type ParkingSpace {
    _id: ID
    name: String
    carOwnerName: String
    carMake: String
    carModel: String
    parkedAt: String
    leftAt: String
    isOccupied: Boolean
    hourlyRate: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    parkingSpaces: [ParkingSpace]
    parkingSpace(name: String!): ParkingSpace
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addParkingSpace(name: String!): ParkingSpace
    updateParkingSpace(name: String!, carOwnerName: String, carMake: String, carModel: String): ParkingSpace
    removeCarFromParkingSpace(name: String!): ParkingSpace
    updateHourlyRate(name: String!, hourlyRate: Float!): ParkingSpace
  }
`;

module.exports = typeDefs;