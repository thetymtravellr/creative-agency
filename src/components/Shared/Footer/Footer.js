import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#FBD062",
        padding: "50px 10px",
        width: "100%",
      }}
      id='contact'
    >
      <Container fluid>
        <Row>
          <Col md={6}>
            <h1>
              Let us handle your <br /> project, professionally.
            </h1>
            <p>
              With well written codes, we build amazing apps for all platforms,
              mobile and web apps in general.
            </p>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Group>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Your email address *"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control name="name" type="text" placeholder="Your Name" />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="companyName"
                  type="text"
                  placeholder="Company name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="designation"
                  type="text"
                  placeholder="Designation"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="feedback"
                  as="textarea"
                  rows="5"
                  placeholder="Your message"
                />
              </Form.Group>

              <Button className="main-button" type="submit">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <br />
      <p className="mt-5 mb-3 text-center">
        Copyright Md Jahedul Hoque {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
