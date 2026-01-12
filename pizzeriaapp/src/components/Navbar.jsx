import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand text-warning d-flex align-items-center" to="/">
          <span>Pizzeria</span>
          <img
            src={logo}
            alt="Pizzeria logo"
            className="navbar-logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/order">
                Order Pizza
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/build">
                Build Your Pizza
              </Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="btn btn-warning" to="/cart">
                🛒 Shopping Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;