import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/_navbar.scss";
import { Search, Close } from "@mui/icons-material";

const NavbarSec = ({ placeholder, data }) => {
  let navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setwordEntered] = useState("");

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(wordEntered);
  };

  //add active className to the navbar link that is clicked
  const handleClick = (e) => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
  };

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setwordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const chosenProduct = (e) => {
    setwordEntered(e);
    setFilteredData([]);
  };

  const clearInput = () => {
    setFilteredData([]);
    setwordEntered("");
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
              <div className="searchInputs">
                <input
                  type="text"
                  value={wordEntered}
                  placeholder={placeholder}
                  className="input_search"
                  onChange={handleFilter}
                />
                <div className="searchIcon">
                  {filteredData.length === 0 ? (
                    <Search />
                  ) : (
                    <Close id="clearBtn" onClick={clearInput} />
                  )}
                </div>
              </div>
              {filteredData.length != 0 && (
                <div className="dataResults">
                  {filteredData.slice(0, 15).map((product, key) => {
                    return (
                      <div
                        className="dataItem"
                        key={key}
                        onClick={chosenProduct.bind(this, product.name)}
                      >
                        <span>{product.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSec;
