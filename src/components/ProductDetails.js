import "../styles/_productdetails.scss";
import productDetails from "../data/productdetails.json";
import { useParams } from "react-router-dom";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";

const ProductDetails = () => {
  let { id } = useParams();

  return (
    <div className="content container">
      {productDetails.map((product) =>
        id === product.id ? (
          <div
            className="product_details_container row row-cols-1 row-cols-lg-2 "
            key={product.id}
          >
            <div className="col" id="product_details">
              <img src={product.productimage[0].first} className="detail_img" />
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
                        {details.shoplink}
                      </div>
                    </div>

                    <div id="share-links">
                      <p className="m-0">test</p>
                    </div>
                  </div>
                );
              })}
              <FacebookShareButton
                url="https://www.facebook.com/watch/live/?ref=watch_permalink&v=4903545583014775"
                quote={"Subscribe bitch"}
                hashtag="#React"
              >
                <FacebookIcon logoFillColor="white" round={true}></FacebookIcon>
              </FacebookShareButton>
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
