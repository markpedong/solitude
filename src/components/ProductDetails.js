import "glider-js/glider.min.css";
import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
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

  //prettier-ignore
  const currentProduct = productDetails.find((product) => product.id === id);

  //get the current product based on the id

  const length = currentProduct.productimage.length;

  // guard clause
  // if (!Array.isArray(currentProduct) || currentProduct.length <= 0) {
  //   return null;
  // }

  // show current image on mouseenter
  const showCurrentImage = (index) => {
    setCurrent(index);
  };

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    // prettier-ignore
    <Container>
        <Container className="productdetails_container" key={currentProduct.id}>
          <Row xs={1} lg={2}>
            <Col className="image_container">
            <Container className="main_image_container">
              <FaArrowAltCircleLeft className="left-arrow" onClick={prevImage} />
              <FaArrowAltCircleRight className="right-arrow" onClick={nextImage} />
              {currentProduct.productimage.map((slide, index) => {
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
                {currentProduct.productimage.map((slide, index) => {
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
                  <p className="details_title">{currentProduct.name}</p>
                  <p className="details_description">{currentProduct.longdescription}</p>
                </Container>
                <Container className="price_container">Original Price: ₽<span className="orig_price">{currentProduct.origprice}</span></Container>
                {currentProduct.detailslinks.map((details) => {
                    return (
                      <Container className="links_details_container" key={details.id}>
                        <Container className="link_image_container">
                          <Image className="link_image" src={details.imagelink} />
                        </Container>
                        <Container className="price_container_link">₽<span>{details.discountprice}</span></Container>
                        <Container className="shop_link_container" >
                          <a className="shop_link" target="_blank" href={details.shoplink}>{details.shoplink}</a>
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
  </Container>
  );
};

export default ProductDetails;
