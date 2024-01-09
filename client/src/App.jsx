import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { useStoreContext } from './utils/GlobalState'; // Ensure this import is correct
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
  const [, dispatch] = useStoreContext(); // Only destructuring dispatch as state is not used

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const user = AuthService.getProfile();
      dispatch(setCurrentUser(user));
    } else {
      if (window.location.pathname !== '/') {
        navigate('/');
      }
      dispatch(logoutUser());
    }
  }, [navigate, dispatch]);

  return (
    <ApolloProvider client={client}>
      <Nav />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;



