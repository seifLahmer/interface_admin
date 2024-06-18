import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-container">
          <h2 className="header-title">Interface Admin</h2>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/employees" className="nav-link">
                Agents
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shifts" className="nav-link">
                Shifts
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/postes" className="nav-link">
                Postes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admins
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/" className="logout-button">
          Log Out
        </Link>
      </div>
    </header>
  );
}

export default Header;
