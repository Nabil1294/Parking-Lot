import { gql } from '@apollo/client';

export const GET_PARKING_SPACES = gql`
  query parkingSpaces {
    parkingSpaces {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
      parkedAt
      leftAt
      isOccupied
      hourlyRate
      user {
        _id
        username
      }
    }
  }
`;

export const GET_SINGLE_PARKING_SPACE = gql`
  query parkingSpace($name: String!) {
    parkingSpace(name: $name) {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
      parkedAt
      leftAt
      isOccupied
      hourlyRate
      user {
        _id
        username
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query me {
    me {
      _id
      username
    }
  }
`;

export const GET_USER_PARKING_SPACES = gql`
  query userParkingSpaces($userId: ID!) {
    parkingSpaces(userId: $userId) {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
      parkedAt
      leftAt
      isOccupied
      hourlyRate
      user {
        _id
        username
      }
    }
  }
`;

