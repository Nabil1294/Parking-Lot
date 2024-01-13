import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { logoutUser } from '../utils/actions';
import AuthService from '../utils/auth';
import decode from 'jwt-decode';
import { useMutation, useApolloClient } from '@apollo/client';
import { ADD_PARKING_SPACE } from '../utils/mutations';
import { GET_USER_PARKING_SPACES } from '../utils/queries';
import '../style/Navbar.css';

const Nav = () => {
  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();
  const client = useApolloClient(); // Access to Apollo Client
  const [showModal, setShowModal] = useState(false);
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [addParkingSpace] = useMutation(ADD_PARKING_SPACE, {
    update: (cache, { data: { addParkingSpace } }) => {
      const { parkingSpaces } = client.readQuery({
        query: GET_USER_PARKING_SPACES,
        variables: { userId: AuthService.getProfile()?.data?._id }
      });
      client.writeQuery({
        query: GET_USER_PARKING_SPACES,
        variables: { userId: AuthService.getProfile()?.data?._id },
        data: { parkingSpaces: [...parkingSpaces, addParkingSpace] }
      });
    }
  });
  const [currentTime, setCurrentTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDateTime() {
    return new Date().toLocaleString();
  }

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logoutUser());
    navigate('/');
  };

  const handleAddParkingSpaceClick = () => {
    setShowModal(true);
    setErrorMessage('');
  };

  const handleAddParkingSpaceSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const token = AuthService.getToken();
    const decoded = token ? decode(token) : null;
    const userId = decoded?.data?._id;

    if (!userId) {
      setErrorMessage("Error: User ID is not available.");
      return;
    }

    try {
      await addParkingSpace({
        variables: {
          name: parkingSpaceName,
          hourlyRate: 10.0,
          userId: userId,
          customerName: '',       // Assigning default empty value
          customerContact: '',    // Assigning default empty value
          carMake: '',            // Assigning default empty value
          carModel: '',           // Assigning default empty value
          parkedAt: null,         // Assigning default null value
          leftAt: null,           // Assigning default null value
          isOccupied: false 
        }
      });
      setParkingSpaceName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding parking space:', error);
      setErrorMessage('A parking space with this name already exists.');

      // Additional error logging
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(err => console.log('GraphQL Error:', err));
      }
      if (error.networkError) {
        console.log('Network Error:', error.networkError);
      }
      if (error.extraInfo) {
        console.log('Extra Info:', error.extraInfo);
      }
    }
  };

  // Ref for the modal content
  const modalContentRef = useRef(null);

  useEffect(() => {
    // Function to check if clicked outside of modal
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalContentRef]);

  const renderAuthButtons = () => {
    if (state.currentUser) {
      return (
        <div className="auth-buttons">
          <Link className="btn btn-outline-light" to="/dashboard">
            Dashboard
          </Link>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="auth-buttons">
          <Link className="btn btn-outline-light" to="/signup">
            Signup
          </Link>
          <Link className="btn btn-outline-light" to="/">
            Login
          </Link>
        </div>
      );
    }
  };

  const renderAddParkingSpaceButton = () => {
    if (state.currentUser) {
      return (
        <>
          <button className="btn btn-outline-light add-space-btn" onClick={handleAddParkingSpaceClick}>
            +
          </button>
          {showModal && (
            <div className="modal">
              <div className="modal-content" ref={modalContentRef}>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleAddParkingSpaceSubmit}>
                  <label htmlFor="parkingSpaceName">Parking Space Name:</label>
                  <input
                    type="text"
                    id="parkingSpaceName"
                    value={parkingSpaceName}
                    onChange={(e) => setParkingSpaceName(e.target.value)}
                    required
                  />
                  <button type="submit">Add Parking Space</button>
                </form>
              </div>
            </div>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <nav className="navbar custom-nav-bg">
      {state.currentUser && renderAddParkingSpaceButton()}
      <div className="nav-center">
        <h1 className="navbar-brand">Parking Lot Manager</h1>
        <div className="navbar-text">{currentTime}</div>
      </div>
      {renderAuthButtons()}
    </nav>
  );
};

export default Nav;






