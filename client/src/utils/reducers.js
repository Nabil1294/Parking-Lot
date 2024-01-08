import {
    SET_PARKING_SPACES,
    UPDATE_PARKING_SPACE,
    SET_CURRENT_USER,
    LOGOUT_USER
  } from './actions';
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case SET_PARKING_SPACES:
        return {
          ...state,
          parkingSpaces: [...action.parkingSpaces],
        };
  
      case UPDATE_PARKING_SPACE:
        return {
          ...state,
          parkingSpaces: state.parkingSpaces.map((space) => {
            if (action.space._id === space._id) {
              return action.space;
            }
            return space;
          }),
        };
  
      case SET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.user,
        };
  
      case LOGOUT_USER:
        return {
          ...state,
          currentUser: null,
        };
  
  
      default:
        return state;
    }
  };
  