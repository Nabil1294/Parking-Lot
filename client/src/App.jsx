import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { StoreProvider, useStoreContext } from './utils/GlobalState';
import AuthService from './utils/auth';
import { setCurrentUser, logoutUser } from './utils/actions';

// Setup Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    if (AuthService.loggedIn()) {
      // Update global state with current user
      const user = AuthService.getProfile();
      dispatch(setCurrentUser(user));
    } else {
      navigate('/');
      // Dispatch logout action to update global state
      dispatch(logoutUser());
    }
  }, [navigate, dispatch]);

  return (
    <ApolloProvider client={client}>
      <StoreProvider> 
        <Nav />
        <Outlet />
      </StoreProvider>
    </ApolloProvider>
  );
}

export default App;
