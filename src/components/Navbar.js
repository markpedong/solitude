import React from "react";
import { Link } from "react-router-dom";
import "../styles/_navbar.scss";

const NavbarSec = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container" id="navbar__Container">
        <a className="navbar-brand fw-bold" to="/">
          Affiliate Marketing
        </a>
        <button
          className="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
          <span className="toggler-icon bottom-bar"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto text-center">
            <Link className="nav-link active" to="/">
              Home
            </Link>
            <Link className="nav-link active" to="/about">
              About
            </Link>
            <Link className="nav-link active" to="/products">
              Products
            </Link>
          </div>
          <form className="d-flex form">
            <input
              className="form-control me-2 search-field"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success search-button"
              type="submit"
            >
              <img src={require("../images/search.png")} />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSec;
