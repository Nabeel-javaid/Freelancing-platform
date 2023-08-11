import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FontAwesomeIcon icon={faHandshakeAngle} className="me-2" />
          <span>jobify</span>
        </Link>
        <div className="ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/service/showservice">Find Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/myservice">My Service</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/hiredservice">Hired Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service/requestedservice">Service Requests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/userlogin">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
