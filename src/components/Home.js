import { Container, Col, Row, Image } from "react-bootstrap";
import "../styles/_home.scss";

const Home = () => {
  return (
    <Container className="home_container">
      <Row>
        <Col className="landing_container">
          <Image
            className="landing_image"
            src={require("../images/landingpage.webp")}
          />
          <Container className="landing_title_container">
            <p className="landing_title">Solitude</p>
            <p className="landing_description">
              Where you can find discounted prices for your favorite online
              products!
            </p>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
