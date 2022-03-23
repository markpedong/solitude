import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/_footer.scss";

const Footer = () => {
  return (
    <Container>
      <Row>
        <Col>
          Copyright © 2017{" "}
          <a
            className="portfolio_link"
            href="https://markpedong.com/"
            target="_blank"
          >
            markpedong.com
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
