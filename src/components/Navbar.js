import React, { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const NavbarSec = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container" id="navbar__Container">
        <a className="navbar-brand" href="#">
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
          <div className="navbar-nav ms-auto">
            <a className="nav-link active" href="#">
              Home
            </a>
            <a className="nav-link" href="#">
              Features
            </a>
            <a className="nav-link" href="#">
              Pricing
            </a>
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
          <DarkModeToggle
            className="darkmode__toggle"
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={95}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarSec;
