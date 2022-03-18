import "../styles/_products.scss";
import shopee from "../images/shopee.svg";
import lazada from "../images/lazada.svg";
import amazon from "../images/amazon.svg";
import { Link, useParams } from "react-router-dom";

const FeaturedProducts = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-3">
        <div className="card col-4" key={1}>
          <Link to={`/products/${1}`} style={{ textDecoration: "none" }}>
            <div className="row col">
              <div className="col-xl-5 p-0">
                <img
                  src={require("../images/food.jpg")}
                  className="img_product"
                />
              </div>
              <div className="col-xl-7 card_container">
                <p className="card-title">Yummy Foods</p>
                <p className="card-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos,
                  dolor?
                </p>
                <p className="link-header">Buy it here:</p>
                <div className="image-container row row-cols-2">
                  <p>
                    <a href="#" target="_blank">
                      <img src={shopee} className="img_link" />
                    </a>
                  </p>
                  <p>
                    <a href="#" target="_blank">
                      <img src={lazada} className="img_link" />
                    </a>
                  </p>
                  <p>
                    <a href="#" target="_blank">
                      <img src={amazon} className="img_link" />
                    </a>
                  </p>
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
