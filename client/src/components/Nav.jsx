import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { logoutUser } from '../utils/actions';
import AuthService from '../utils/auth';

const Nav = () => {
  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logoutUser());
    navigate('/');
  };

  const renderAuthLinks = () => {
    if (state.currentUser) {
      return (
        <>
          <span className="navbar-text mr-2">
            Welcome, {state.currentUser.username}
          </span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link className="btn btn-primary mr-2" to="/signup">
            Signup
          </Link>
          <Link className="btn btn-secondary" to="/">
            Login
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/dashboard">
        Parking Lot Manager
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {renderAuthLinks()}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
