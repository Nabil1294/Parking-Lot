import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'; // Ensure this path is correct

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    parkingSpaces: [],   // Array of parking spaces
    currentUser: null,   // Current logged-in user
  });

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
