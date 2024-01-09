import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { logoutUser } from '../utils/actions';
import AuthService from '../utils/auth';
import { useEffect, useState } from 'react';
import '../style/Navbar.css';

const Nav = () => {
  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(getCurrentDateTime());

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentDateTime());
    }, 1000);

    // Cleanup the interval when the component unmounts
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
      const handleAddParkingSpace = () => {
        // Logic to add a parking space
      };

      return (
        <button className="btn btn-outline-light add-space-btn" onClick={handleAddParkingSpace}>
          +
        </button>
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


