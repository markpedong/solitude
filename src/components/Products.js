import { ChevronLeftSharp, ChevronRightSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import productPageImage from "../data/productpageimage.json";
import products from "../data/products.json";
import "../styles/_products.scss";
import "../styles/_allproducts.scss";

const Products = () => {
  const [current, setCurrent] = useState(0);

  //prettier-ignore
  const currentProduct = productPageImage.map((product) => product.productimage);

  const length = currentProduct.length;

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  //run nextImage function every 3 seconds until the length of the array is reached
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [current]);

  //sort the products array alphabetically
  const sliceProducts = products.sort((a, b) =>
    a.id > b.id ? 1 : b.id > a.id ? -1 : 0
  );

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
            {productPageImage.map((slide, index) => {
              return (
                <Container
                  className={index === current ? "slide active" : "slide"}
                  key={index}
                >
                  {index === current && (
                    <Image
                      className="product_image"
                      src={slide.link}
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
                // prettier-ignore
                return (
                  <Col className="products_container" key={product.id}>
                    <Link to={`/products/${product.id}`} className="product_link">
                    <Image className="product_mainimage" src={product.productimage} />
                    <Container className="description_container">
                      <p className="description_header">{product.name}</p>
                      <p className="description_details">{product.shortdescription}</p>
                      <Container className="image_container">
                        {product.linksimages.map((image) => <Image key={image.id} className="image_shop" src={image.imagelink}/> )}
                      </Container>
                    </Container>
                    </Link>
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
