import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import SweetAlert from "react-bootstrap-sweetalert";

const AddReview = () => {
  const { register, handleSubmit, errors } = useForm();
  const { loggedInUser } = useContext(UserContext);
  const [formSubmitStatus, setFormSubmitStatus] = useState("");

  const onSubmit = (data) => {
    data.image = loggedInUser.photo;
    fetch("https://agency-jahed.herokuapp.com/addFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormSubmitStatus("Review added successfully");
          document.getElementById("addReviewForm").reset();
        } else {
          setFormSubmitStatus("Something went wrong");
        }
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={1} lg={2}>
          <Sidebar />
        </Col>
        <Col className="mt-4" xs={10}>
          <Row>
            <Col md={3} sm={6}>
              <h4>Leave a Review</h4>
            </Col>
            <Col md={{ span: 3, offset: 6 }} sm={6}>
              <h5>{loggedInUser.name}</h5>
            </Col>
          </Row>
          <div
            className="mt-3 p-lg-5 p-0"
            style={{ backgroundColor: "#E5E5E5", height: "600px" }}
          >
            {formSubmitStatus && (
              <SweetAlert
                type={formSubmitStatus.includes("added") ? "success" : "danger"}
                title={
                  formSubmitStatus.includes("added") ? "Good Job!" : "Oops!"
                }
                onConfirm={() => setFormSubmitStatus("")}
              >
                {formSubmitStatus}
              </SweetAlert>
            )}

            <form
              id="addReviewForm"
              className="w-lg-50 w-100 p-lg-5 p-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="Your name"
                className="form-control"
                name="name"
                ref={register({
                  required: "Your name is required",
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message:
                      "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
              {errors.clientName && (
                <span className="error">{errors.clientName.message}</span>
              )}
              <br />

              <input
                placeholder="Ex: CTO at Leads Corporation"
                className="form-control"
                name="designation"
                ref={register({
                  required: "Designation is required",
                  pattern: {
                    value: /[A-Za-z0-9]{3}/,
                    message:
                      "Category must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
              {errors.designation && (
                <span className="error">{errors.designation.message}</span>
              )}
              <br />

              <textarea
                placeholder="Your comment about us"
                rows="4"
                className="form-control"
                name="review"
                ref={register({
                  required: "This field is required",
                  pattern: {
                    value: /^([a-zA-Z0-9 ]{10,400})/,
                    message: "This field must contain at least 10 char ",
                  },
                })}
              />
              {errors.review && (
                <span className="error">{errors.review.message}</span>
              )}
              <br />

              <input
                className=" main-button mt-3"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddReview;
