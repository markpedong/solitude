import { Close, Search } from "@mui/icons-material";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/_navbar.scss";

const NavbarSec = ({ placeholder, data }) => {
  let navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setwordEntered] = useState("");
  const [productId, setproductId] = useState("");
  const [expanded, setExpanded] = useState(false);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setExpanded(false);

    if (!wordEntered || !productId === "") return;

    //navigate to product page
    navigate(`/products/${productId}`);
    clearInput();
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
    setwordEntered(e.target.innerText);
    setFilteredData([]);

    //transform the e.target.innerText into a lowercase string with hypen in between words
    const newProductId = e.target.innerText.toLowerCase().split(" ").join("-");

    //set the productId state to the newProductId
    setproductId(newProductId);

    navigate(`/products/${newProductId}`);

    clearInput();
  };

  const clearInput = () => {
    setFilteredData([]);
    setwordEntered("");
  };

  const handleClick = () => {
    const nav = document.querySelectorAll(".nav-link");

    if (nav) setExpanded(false);
  };

  return (
    <Navbar variant="dark" expand="lg" expanded={expanded}>
      <Container fluid="lg" className="navbar_container">
        <Navbar.Brand>Solitude</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        >
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
          <span className="toggler-icon bottom-bar"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" onClick={handleClick}>
          {/* prettier-ignore */}
          <Nav className="ms-auto">
            <Link  className="nav-link" to="/">Home</Link>
            <Link  className="nav-link" to="/about">About</Link>
            <Link  className="nav-link" to="/products">Products</Link>
          </Nav>
        </Navbar.Collapse>
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
                  <button type="submit" className="submit_btn">
                    <Search />
                  </button>
                ) : (
                  <Close id="clearBtn" onClick={clearInput} />
                )}
              </div>
            </div>
            {filteredData.length != 0 && (
              <div className="dataResults">
                {filteredData.slice(0, 15).map((product, key) => {
                  return (
                    <Link
                      className="dataItem"
                      key={key}
                      onClick={chosenProduct}
                      to={`/products/${product.id}`}
                    >
                      <img
                        src={product.productimage}
                        alt="productimage"
                        className="search_image"
                      />
                      <p className="search_description">{product.name}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </form>
      </Container>
    </Navbar>
  );
};

export default NavbarSec;
