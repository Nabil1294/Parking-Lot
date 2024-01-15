import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const initialState = {
    parkingSpaces: [],  // Array of parking spaces
    currentUser: null, 
    shouldRefetch: false, // Flag to indicate refetching is needed
};
const [state, dispatch] = useReducer(reducer, initialState);

return (
<StoreContext.Provider value={[state, dispatch]}>
{children}
</StoreContext.Provider>
);
};

export const useStoreContext = () => {
return useContext(StoreContext);
};