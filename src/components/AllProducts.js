import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import "../styles/_allproducts.scss";

const AllProducts = () => {
  // alphabetical order of the products array
  const sliceProducts = products.sort((a, b) =>
    a.id > b.id ? 1 : b.id > a.id ? -1 : 0
  );

  return (
    <Container>
      <Row xs={2} sm={3} md={4} lg={5}>
        {sliceProducts.map((product) => {
          return (
            // prettier-ignore
            <Col key={product.id} className="all_card_outer_container">
              <Link to={`/products/${product.id}`} className="card_link">
                <Card className="all_card_container">
                  <Card.Img className="all_card_image" src={product.productimage} />
                  <Card.Body className="all_card_body">
                    <Card.Title className="card_title">{product.name}</Card.Title>
                    <Card.Text className="all_card_description">{product.shortdescription}</Card.Text>
                    <Container className="all_card_image_container">
                      {product.linksimages.map((image) => {
                        return (
                          <Card.Img key={image.id} className="all_card_image_link" src={image.imagelink} />
                        );
                      })}
                    </Container>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AllProducts;
