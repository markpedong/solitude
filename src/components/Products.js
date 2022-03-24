import { Route, Routes } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";
import AllProducts from "./AllProducts";
import { Container, Row, Col, Image } from "react-bootstrap";
import "../styles/_products.scss";
import * as React from "react";
import "glider-js/glider.min.css";
import products from "../data/products.json";
import { useState, useEffect } from "react";
import { ChevronLeftSharp, ChevronRightSharp } from "@mui/icons-material";

const Products = () => {
  const [current, setCurrent] = useState(0);

  //prettier-ignore
  const currentProduct = products.map((product) => product.productimage);
  const length = currentProduct.length;

  // run nextImage function after 2 seconds after loading the page

  useEffect(() => {
    setTimeout(() => {
      nextImage();
    }, 2000);
  }, []);

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  return (
    <Container fluid="lg" className="product_main_container">
      <Row>
        <Col xs={12} lg={6} className="product_title_container">
          <p className="product_header">Products</p>
          <p className="product_description">
            We find products that comes with discounted prices! This list of
            discount products will help you save money when shopping online. Go
            shopping for discounts, coupons and sales and find the best bargains
            in our site!
          </p>
        </Col>
        <Col xs={12} lg={6} className="product_image_main">
          <Container className="product_image_container">
            <ChevronLeftSharp className="left-button" onClick={prevImage} />
            <ChevronRightSharp className="right-button" onClick={nextImage} />
            {currentProduct.map((slide, index) => {
              return (
                <Container
                  className={index === current ? "slide active " : "slide "}
                  key={index}
                >
                  {index === current && (
                    <Image
                      className="product_image"
                      src={slide}
                      alt="product_image"
                    />
                  )}
                </Container>
              );
            })}
          </Container>
        </Col>
        <Col xs={12} className="allproducts_container">
          <p className="allproducts_header">all products</p>
          <Container className="allproducts_maincontainer">
            <Row xs={2} sm={3} md={4} lg={5} xl={6} xxl={7}>
              {products.map((product) => {
                return (
                  // prettier-ignore
                  <Col className="products_container" key={product.id}>
                    <Image className="product_mainimage" src={product.productimage} />
                    <Container className="description_container">
                      <p className="description_header">{product.name}</p>
                      <p className="description_details">{product.shortdescription}</p>
                      <Container className="image_container">
                        {product.linksimages.map((image) => <Image key={image.id} className="image_shop" src={image.imagelink}/> )}
                      </Container>
                    </Container>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
