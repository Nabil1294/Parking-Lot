import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { logoutUser } from '../utils/actions';
import AuthService from '../utils/auth';
import '../style/Navbar.css';

const Nav = () => {
  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();

  const getCurrentDateTime = () => {
    return new Date().toLocaleString();
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logoutUser());
    navigate('/');
  };

  const renderAuthButtons = () => {
    if (state.currentUser) {
      return (
        <div className="auth-buttons">
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="auth-buttons">
          <Link className="btn btn-outline-light" to="/signup">Signup</Link>
          <Link className="btn btn-outline-light" to="/">Login</Link>
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
        <Link className="navbar-brand" to="/dashboard">Parking Lot Manager</Link>
        <div className="navbar-text">{getCurrentDateTime()}</div>
      </div>
      {renderAuthButtons()}
    </nav>
  );
};

export default Nav;
