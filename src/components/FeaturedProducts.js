import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/_featuredProducts.scss";
import products from "../data/products.json";

const FeaturedProducts = () => {
  const sliceProducts = products.slice(0, 3);

  return (
    <Container>
      <Row xs={1} md={2} lg={3}>
        {sliceProducts.map((product) => {
          return (
            // prettier-ignore
            <Col key={product.id} className="card_outer_container">
              <Link to={`/products/${product.id}`} className="card_link">
                <Card className="card_container">
                  <Card.Img className="card_image" src={product.productimage} />
                  <Card.Body className="card_body">
                    <Card.Title className="card_title">{product.name}</Card.Title>
                    <Card.Text className="card_description">{product.shortdescription}</Card.Text>
                    <Container className="card_image_container">
                      {product.linksimages.map((image) => {
                        return (
                          <Card.Img key={image.id} className="card_image_link" src={image.imagelink} />
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

export default FeaturedProducts;
