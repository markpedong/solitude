import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/_navbar.scss";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

const NavbarSec = () => {
  let navigate = useNavigate();

  //print the value of search field on change
  const [search, setSearch] = useState("");

  //get the value of search on submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();

    const productName = items.find((item) => item.name === search);

    console.log(productName);
  };
  const items = [
    { id: 1, name: "lint-remover" },
    { id: 2, name: "shampoo-dispenser" },
    { id: 3, name: "portable-scooper" },
  ];

  const formatResult = (item) => {
    return (
      <>
        <span className="search_suggestion">{item.name}</span>
      </>
    );
  };

  const handleOnSearch = (result) => {
    setSearch(result);
  };

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
          <form className="d-flex form" onSubmit={handleSubmit}>
            <div className="search_container">
              <ReactSearchAutocomplete
                items={items}
                autoFocus
                formatResult={formatResult}
                onSearch={handleOnSearch}
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSec;
