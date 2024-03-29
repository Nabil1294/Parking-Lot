export const SET_PARKING_SPACES = 'SET_PARKING_SPACES';
export const UPDATE_PARKING_SPACE = 'UPDATE_PARKING_SPACE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const TRIGGER_REFETCH = 'TRIGGER_REFETCH';
export const RESET_REFETCH = 'RESET_REFETCH';

// Action creators:

export const setParkingSpaces = (parkingSpaces) => ({
  type: SET_PARKING_SPACES,
  parkingSpaces,
});

export const updateParkingSpace = (space) => ({
  type: UPDATE_PARKING_SPACE,
  space,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const triggerRefetch = () => ({
  type: TRIGGER_REFETCH,
});

export const resetRefetch = () => ({
  type: RESET_REFETCH,
});
