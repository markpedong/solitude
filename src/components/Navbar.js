import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/_navbar.scss";
import { Navbar, Container, Nav } from "react-bootstrap";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

const NavbarSec = () => {
  let navigate = useNavigate();

  //print the value of search field on change
  const [search, setSearch] = useState("");

  //get the value of search on submit of the form

  const handleOnHover = (res) => {
    //clear setSearch value
    setSearch("");
    if (!res.name) return;

    setSearch(res.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/products/${search}`);
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

  //add active className to the navbar link that is clicked
  const handleClick = (e) => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container className="navbar_container">
        <Navbar.Brand>Solitude</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
          <span className="toggler-icon bottom-bar"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          {/* prettier-ignore */}
          <Nav className="ms-auto" onClick={handleClick}>
            <Link className="nav-link"  to="/">Home</Link>
            <Link className="nav-link"  to="/about">About</Link>
            <Link className="nav-link"  to="/products">Products</Link>
          </Nav>

          <form className="form" onSubmit={handleSubmit}>
            <div className="search_container">
              <ReactSearchAutocomplete
                items={items}
                formatResult={formatResult}
                autoFocus
                onHover={handleOnHover}
              />
            </div>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSec;
