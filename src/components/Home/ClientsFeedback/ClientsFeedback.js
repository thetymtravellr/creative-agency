import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ClientsFeedback.css";

const ClientsFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("https://agency-jahed.herokuapp.com/getFeedbacks")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);

  return (
    <section id="team" className="clients-feedback my-5 pt-5">
      <Container fluid>
        <h3 className="main-title text-center ">
          Clients <span>Feedback</span>{" "}
        </h3>
        <div className="w-75 m-auto">
          <Row>
            {feedbacks.map((feedback) => (
              <Col key={feedback._id} className="my-3" md={4} sm={6}>
                <div className="single-feedback">
                  <Row>
                    <Col xs={3}>
                      <img
                        className="review-img rounded-circle"
                        src={
                          feedback.image || "https://i.imgur.com/WrJ9XL8.jpg"
                        }
                        alt=""
                      />
                    </Col>
                    <Col className="text-lg-left text-md-right" xs={8} md={9}>
                      <h5 className="feedback-name">{feedback.name}</h5>
                      <h6 className="feedback-designation">
                        {feedback.designation}
                      </h6>
                    </Col>
                  </Row>
                  <p className="text-secondary ">{feedback.review}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default ClientsFeedback;
