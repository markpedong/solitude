import { Container, Row, Col, Image } from "react-bootstrap";
import weblogocircle from "../images/weblogo-dark.svg";
import "../styles/_about.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const About = () => {
  return (
    <Container className="about_container">
      <Row>
        <Col sm={3} md={4} lg={5}>
          <Image src={weblogocircle} className="website_logo" alt="web_logo" />
        </Col>

        <Col xs={12} sm={9} md={8} lg={7}>
          <p className="about_header">
            Thank you for visiting Solitude! A place where you can be on your
            own.
          </p>
        </Col>
        <Col xs={12} sm={3} md={4} lg={5}>
          <Container className="connect_container">
            <p className="connect_with_us">connect with me</p>
            <Container className="connect_links">
              <p>LinkedIn</p>
              <p>Github</p>
              <p>Instagram</p>
              <p>Twitter</p>
            </Container>
          </Container>
          <Container className="website_link_container">
            <a
              href="https://markpedong.com/"
              className="website_link"
              target="_blank"
            >
              markpedong.com
            </a>
          </Container>
        </Col>
        <Col xs={12} sm={9} md={8} lg={7}>
          <Container className="location_container">
            <p className="location_header">location</p>

            <Container className="location_container_details">
              <LocationOnIcon />
              <p>General Trias City, Cavite 4107</p>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
