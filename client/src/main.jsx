import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState'; // Ensure this import is correct

import App from './App.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import NoMatch from './pages/NoMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      { index: true, element: <Login /> },
      { path: '/signup', element: <Signup /> }
      // Additional routes can be added here
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    <RouterProvider router={router} />
  </StoreProvider>
);
