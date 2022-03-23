import { Container, Col, Row, Image } from "react-bootstrap";
import "../styles/_home.scss";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Image
            className="landing_image"
            src={require("../images/landingpage.jpg")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
