import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PARKING_SPACE = gql`
  mutation addParkingSpace($name: String!, $hourlyRate: Float, $userId: ID!) {
    addParkingSpace(name: $name, hourlyRate: $hourlyRate, user: $userId) {
      _id
      name
      hourlyRate
      user {
        _id
        username
      }
      customerName
      customerContact
      carMake
      carModel
      parkedAt
      leftAt
      isOccupied
    }
  }
`;


export const UPDATE_PARKING_SPACE = gql`
  mutation updateParkingSpace($id: ID!, $customerName: String, $customerContact: String, $carMake: String, $carModel: String, $parkedAt: String) {
    updateParkingSpace(id: $id, customerName: $customerName, customerContact: $customerContact, carMake: $carMake, carModel: $carModel, parkedAt: $parkedAt) {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
      parkedAt
      isOccupied
    }
  }
`;


export const REMOVE_CAR_FROM_PARKING_SPACE = gql`
  mutation removeCarFromParkingSpace($name: String!) {
    removeCarFromParkingSpace(name: $name) {
      _id
      name
      customerName
      customerContact
      isOccupied
    }
  }
`;

export const PROCESS_PAYMENT = gql`
  mutation processPayment($name: String!, $hours: Int!, $sourceToken: String!) {
    processPayment(name: $name, hours: $hours, sourceToken: $sourceToken) {
      success
      chargeId
    }
  }
`;