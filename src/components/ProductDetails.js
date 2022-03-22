import "glider-js/glider.min.css";
import { useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { default as Glider, default as Pane } from "react-glider";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import productDetails from "../data/productdetails.json";
import "../styles/_productdetails.scss";

const ProductDetails = () => {
  let { id } = useParams();
  const location = window.location.href;
  const [current, setCurrent] = useState(0);

  //show current image on mouseenter
  const showCurrentImage = (index) => {
    console.log(index);
    setCurrent(index);
  };

  //prettier-ignore
  const currentProduct = productDetails.find((product) => product.id === id).productimage;
  const length = currentProduct.length;

  // guard clause
  if (!Array.isArray(currentProduct) || currentProduct.length <= 0) {
    return null;
  }

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    // prettier-ignore
    <Container>
      {productDetails.map((product) =>
        id === product.id ? 
          (
    <Container className="productdetails_container" key={product.id}>
      <Row xs={1} lg={2}>
        <Col>
        <Container className="main_image_container">
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevImage} />
          <FaArrowAltCircleRight className="right-arrow" onClick={nextImage} />
          {product.productimage.map((slide, index) => {
              return (
                <Container className={index === current ? "slide active" : "slide"} key={index}>
                  {index === current && <Image className="main_image" src={slide.image} alt="product_image" />}
                </Container>
              );
            })
          }
        </Container>
        <Container className="rest_image_container">
          <Glider hasDots slidesToShow={4} slidesToScroll={1}>
            {product.productimage.map((slide, index) => {
                return (
                  <Pane key={index}>
                    <Image className="rest_image" src={slide.image} alt="product_image" onMouseEnter={() => showCurrentImage(index)} />
                  </Pane>
                );
        })}
          </Glider>
        </Container>
        </Col>
        <Col>
          <Container className="details_container">
            <p className="details_title">{product.name}</p>
            <p className="details_description">{product.longdescription}</p>
          </Container>
          <Container className="price_container">Original Price: ₽<span className="orig_price">{product.origprice}</span></Container>
          {product.detailslinks.map((details) => {
              return (
                <Container className="links_details_container" key={details.id}>
                  <Container className="link_image_container">
                    <Image className="link_image" src={details.imagelink} />
                  </Container>
                  <Container className="price_container_link">₽<span>{details.discountprice}</span></Container>
                  <Container className="shop_link_container" >
                    <a className="shop_link" href={details.shoplink}>{details.shoplink}</a>
                  </Container>
                </Container>
              )
            })
          }
        
          <Container className="socials_header_container">
              <p className="socials_header">Share to Social Media : </p>
          </Container>
          <Container className="socials_container">
            <FacebookShareButton url={location}>
              <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
            <FacebookShareButton url={location}>
              <FacebookMessengerIcon size={35} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={location}>
              <TwitterIcon size={35} round={true} />
            </TwitterShareButton>
            <EmailShareButton url={location}>
              <EmailIcon size={35} round={true} />
            </EmailShareButton>
          </Container>
        </Col>
      </Row>
    </Container>
          )
        : ("")
      )}
    </Container>
  );
};

export default ProductDetails;
