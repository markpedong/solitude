import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "../styles/_allproducts.scss";

const AllProducts = () => {
  // alphabetical order of the products array
  const sliceProducts = products.sort((a, b) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  return (
    <div className="container" id="all_products_container">
      <div
        className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5"
        id="product_row"
      >
        {sliceProducts.map((product) => {
          return (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              id="product_container_link"
            >
              <Card>
                <Card.Img variant="top" src={product.productimage} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.shortdescription}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
