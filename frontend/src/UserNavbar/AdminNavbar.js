import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshakeAngle } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
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
              <Link className="nav-link" to="/displayform">View Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminservicesearch">Search Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminusersearch">Search User</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/adminnavigation">Notfication</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
