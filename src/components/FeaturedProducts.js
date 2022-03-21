import { Link } from "react-router-dom";

import "../styles/_products.scss";
import products from "../data/products.json";

const FeaturedProducts = () => {
  const sliceProducts = products.slice(0, 3);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {sliceProducts.map((product) => (
          <div className="card col" key={product.id}>
            <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="row col">
                <div className="col-xl-5 p-0">
                  <img
                    src={product.productimage}
                    className="img_product"
                    alt="product_name"
                  />
                </div>
                <div className="col-xl-7 card_container">
                  <p className="card-title">{product.name}</p>
                  <p className="card-description">{product.shortdescription}</p>
                  <p className="link-header">Buy it here:</p>
                  <div className="image-container">
                    {product.linksimages.map((img) => {
                      return (
                        <div className="col" id="img_container" key={img.id}>
                          <img
                            src={img.imagelink}
                            className="img_link"
                            alt="img_product"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
