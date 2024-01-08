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
  mutation updateParkingSpace($name: String!, $carOwnerName: String, $carMake: String, $carModel: String) {
    updateParkingSpace(name: $name, carOwnerName: $carOwnerName, carMake: $carMake, carModel: $carModel) {
      _id
      name
      carOwnerName
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
      isOccupied
    }
  }
`;

export const PROCESS_PAYMENT = gql`
  mutation processPayment($name: String!, $hours: Int!) {
    processPayment(name: $name, hours: $hours) {
      success
      chargeId
    }
  }
`;
