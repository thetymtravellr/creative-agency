import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./OurServices.css";
import SingleService from "./SingleService/SingleService";

const OurServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getServices")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
      });
  }, []);

  return (
    <Container className="my-5 pt-5">
      <section className="our-services">
        <h3 className="main-title text-center">
          Provide awesome <span>services</span>{" "}
        </h3>
        <div className="mt-5">
          <Row>
            {services.map((service) => {
              return (
                <Col lg={4} md={6} sm={12} className="my-3">
                  <SingleService service={service} />
                </Col>
              );
            })}
          </Row>
        </div>
      </section>
    </Container>
  );
};

export default OurServices;
