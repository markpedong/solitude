import { Link } from "react-router-dom";

import "../styles/_allproducts.scss";
import allProducts from "../data/allproducts.json";

const AllProducts = () => {
  return (
    <div className="container" id="all_products_container">
      <div
        className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5"
        id="product_row"
      >
        {allProducts.map((product) => {
          return (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              style={{ textDecoration: "none" }}
            >
              <div className="card" id="product_container">
                <img
                  className="card-img-top"
                  src={product.productimage}
                  alt="Card image cap"
                  id="card_products"
                />
                <div className="card-body">
                  <p className="card-title">{product.name}</p>
                  <p className="card-text">{product.shortdescription}</p>
                  <div className="img_link_container">
                    {product.linksimages.map((link) => {
                      return (
                        <img
                          key={link.id}
                          src={link.imagelink}
                          alt="Card image cap"
                          id="card_img"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
