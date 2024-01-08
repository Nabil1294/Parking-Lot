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

export const UPDATE_PARKING_SPACE = gql`
  mutation updateParkingSpace($name: String!, $customerName: String, $customerContact: String, $carMake: String, $carModel: String) {
    updateParkingSpace(name: $name, customerName: $customerName, customerContact: $customerContact, carMake: $carMake, carModel: $carModel) {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
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