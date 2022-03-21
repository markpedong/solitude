import "glider-js/glider.min.css";
import { useState } from "react";
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

  //sshohow the next immage on rest_image_container
  const showNextImage = () => {
    if (current === length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="content container">
      {productDetails.map((product) =>
        id === product.id ? (
          <div
            className="product_details_container row row-cols-1 row-cols-lg-2 "
            key={product.id}
          >
            <div className="col" id="product_details">
              <div id="main_image_container">
                <FaArrowAltCircleLeft
                  className="left-arrow"
                  onClick={prevImage}
                />
                <FaArrowAltCircleRight
                  className="right-arrow"
                  onClick={nextImage}
                />

                {product.productimage.map((slide, index) => {
                  return (
                    <div
                      className={index === current ? "slide active" : "slide"}
                      key={index}
                      id="detail_img_container"
                    >
                      {index === current && (
                        <img src={slide.image} className="detail_img" />
                      )}
                    </div>
                  );
                })}
              </div>
              <div id="rest_image_container">
                {/* prettier-ignore */}
                <Glider hasDots slidesToShow={4} slidesToScroll={1}>
                  {product.productimage.map((slide, index) => {
                    return (
                      <Pane key={index}>
                        <img
                          src={slide.image}
                          id="rest_image"
                          onMouseEnter={() => showCurrentImage(index)}
                        />
                      </Pane>
                    )
                  })}
                </Glider>
              </div>
            </div>
            <div className="col">
              <div>
                <p className="details_title">{product.name}</p>
                <p className="details_description_header">
                  Product Description:
                </p>
                <p className="details_description">{product.longdescription}</p>
              </div>
              <div id="links_container">
                Original Price: ₽
                <span className="orig_price">{product.origprice}</span>
              </div>

              {product.detailslinks.map((details) => {
                return (
                  <div id="details_links_container" key={details.id}>
                    <div id="price_links">
                      <div
                        className="link_image_container"
                        id="links_container"
                      >
                        <img
                          src={details.imagelink}
                          alt="image_link"
                          className="link_image"
                        />
                      </div>

                      <div className="link_price" id="links_container">
                        ₽ {details.discountprice}
                      </div>
                      <div className="link" id="links_container">
                        <a className="shop_link" href={details.shoplink}>
                          {details.shoplink}
                        </a>
                      </div>
                    </div>

                    <div id="share_links">
                      <p>Share to Social Media : </p>
                    </div>
                  </div>
                );
              })}

              <div className="share_icon_container">
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
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default ProductDetails;
