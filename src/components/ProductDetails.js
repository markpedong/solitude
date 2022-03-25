import { useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import productDetails from "../data/productdetails.json";
import "../styles/_productdetails.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

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

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  return (
    // prettier-ignore
    <Container fluid="lg" className="productdetails_container">
      <Row xs={1} lg={2}>
        <Col className="p-0 imagecol-container">
          <Container className="mainimage_container">
            <KeyboardDoubleArrowLeft fontSize="large" className="left-arrow" onClick={prevImage}/>
            <KeyboardDoubleArrowRight fontSize="large"  className="right-arrow"  onClick={nextImage}/>
            {currentProduct.productimage.map((slide, index) => {
              return (
                <Container className={index === current ? "slide active" : "slide"} key={index}>
                  {index === current && ( <Image src={slide.image} className="main_image" alt="product_image"/>)}
                </Container>
              );
            })}
          </Container>
          <Container className="restimage_container">
            <Slider {...settings}>
                {currentProduct.productimage.map((slide, index) => {
                  return(
                    <Container key={index} className="rest_image_container">
                      <Image className="rest_image" src={slide.image} alt="product_image" onMouseEnter={() => showCurrentImage(index)}/>
                    </Container>
                  )
                })}
            </Slider>
          </Container>
        </Col>
        <Col>
          <Container className="details_container">
            <p className="details_title">{currentProduct.name}</p>
            <p className="details_description">{currentProduct.longdescription}</p>
          </Container>
          <Container className="orig_price_container"> Original Price: <span className="orig_price"> ₽{currentProduct.origprice}</span></Container>
          {currentProduct.detailslinks.map((details) => {
              return (
                <Container className="links_details_container" key={details.id}>
                  <Container className="link_image_container">
                    <Image className="link_image" src={details.imagelink} />
                  </Container>
                  <Container className="price_container_link">
                    <span className="discount_price">₽{details.discountprice}</span>
                  </Container>
                  <Container className="shop_link_container">
                    <a className="shop_link" target="_blank" href={details.shoplink}>{details.shoplink}</a>
                  </Container>
                </Container>
              );
            })}
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
  );
};

export default ProductDetails;
