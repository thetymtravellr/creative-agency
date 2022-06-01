import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./OurClients.css";

const OurClients = () => {
  return (
    <section className="our-client mb-5">
      <Container fluid>
        <div>
          <Row>
            <Col xs={4} md={{ span: 2, offset: 1 }} lg={{ span: 2, offset: 1 }}>
              <img src="https://i.imgur.com/iYNrqMb.png" alt="" />
            </Col>
            <Col xs={4} md={2} lg={2}>
              <img src="https://i.imgur.com/wjU6yV8.png" alt="" />
            </Col>
            <Col xs={4} md={2} lg={2}>
              <img src="https://i.imgur.com/HPJZkGG.png" alt="" />
            </Col>
            <Col xs={4} md={2} lg={2}>
              <img src="https://i.imgur.com/OlfsZjT.png" alt="" />
            </Col>
            <Col xs={4} md={2} lg={2}>
              <img src="https://i.imgur.com/03T2vAh.png" alt="" />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default OurClients;
