import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import products from "../data/products";
import "../styles/_navbar.scss";

const NavbarSec = () => {
  let navigate = useNavigate();

  //print the value of search field on change
  const [search, setSearch] = useState("");

  //get the value of search on submit of the form

  const handleOnHover = (res) => {
    //clear setSearch value
    if (!res.name) return;

    setSearch(res.name);
  };

  function handleOnSearch(res) {
    return res;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/products/${search}`);

    search = "";
  };

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

  const [searchTerm, setSearchTerm] = useState("");

  console.log(searchTerm);

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
              {/* <ReactSearchAutocomplete
                items={items}
                formatResult={formatResult}
                autoFocus
                onHover={handleOnHover}
                c
                onSearch={handleOnSearch}
              /> */}
              <input
                type="text"
                className="input_search"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {products
                .filter((value) => {
                  if (searchTerm == "") {
                    return value;
                  } else if (
                    value.id.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value, index) => {
                  return (
                    <div className="product_id" key={index}>
                      <p> {value.id} </p>
                    </div>
                  );
                })}
            </div>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSec;
