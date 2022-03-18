import { Link } from "react-router-dom";
import amazon from "../images/amazon.svg";
import lazada from "../images/lazada.svg";
import shopee from "../images/shopee.svg";
import "../styles/_products.scss";

const FeaturedProducts = () => {
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        <div className="card col" key={1}>
          <Link to={`/products/${1}`} style={{ textDecoration: "none" }}>
            <div className="row col">
              <div className="col-xl-5 p-0">
                <img
                  src={require("../images/food.jpg")}
                  className="img_product"
                  alt="product_name"
                />
              </div>
              <div className="col-xl-7 card_container">
                <p className="card-title">Yummy Foods</p>
                <p className="card-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
                  dolor?
                </p>
                <p className="link-header">Buy it here:</p>
                <div className="image-container">
                  <div className="col" id="img_container">
                    <img src={shopee} className="img_link" alt="img_product" />
                  </div>
                  <div className="col" id="img_container">
                    <img src={amazon} className="img_link" alt="img_product" />
                  </div>
                  <div className="col" id="img_container">
                    <img src={lazada} className="img_link" alt="img_product" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
