import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import "./Order.css";

const Order = () => {
  // Hooks for react-form-hooks
  const { register, handleSubmit, errors } = useForm();
  const { loggedInUser } = useContext(UserContext);
  const [formSubmitStatus, setFormSubmitStatus] = useState("");

  const onSubmit = (data) => {
    const status = "Pending";
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("category", data.category);
    formData.append("details", data.details);
    formData.append("price", data.price);
    formData.append("status", status);
    formData.append("file", data.image[0]);

    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormSubmitStatus("Order placed successfully");
          document.getElementById("orderForm").reset();
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
            <Col md={2} sm={6}>
              <h4>Place Order</h4>
            </Col>
            <Col md={{ span: 3, offset: 7 }} sm={6}>
              <h5>{loggedInUser.name}</h5>
            </Col>
          </Row>
          <div
            className="mt-3 "
            style={{ backgroundColor: "#E5E5E5", height: "600px" }}
          >
            {formSubmitStatus && (
              <SweetAlert
                type={
                  formSubmitStatus.includes("placed") ? "success" : "danger"
                }
                title={
                  formSubmitStatus.includes("placed") ? "Good Job!" : "Oops!"
                }
                onConfirm={() => setFormSubmitStatus("")}
              >
                {formSubmitStatus}
              </SweetAlert>
            )}
            <form
              id="orderForm"
              className="w-lg-50 w-md-100 p-lg-5 p-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="Your name/ Company Name"
                className="form-control"
                name="name"
                ref={register({
                  required: "Your name/ Company Name is required",
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message:
                      "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
              <br />

              <input
                placeholder="Your Email"
                className="form-control"
                defaultValue={loggedInUser.email}
                name="email"
                ref={register({
                  required: "Email required",
                  pattern: {
                    value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
              <br />

              <input
                placeholder="Category EX:Graphic Design"
                className="form-control"
                name="category"
                ref={register({
                  required: "Category is required",
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message:
                      "Category must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
              {errors.category && (
                <span className="error">{errors.category.message}</span>
              )}
              <br />

              <textarea
                placeholder="Project Details"
                rows="4"
                className="form-control"
                name="details"
                ref={register({
                  required: "Project Details required",
                  pattern: {
                    value: /^([a-zA-Z0-9 ]{10,400})/,
                    message: "Project Details must contain be 10-40 char ",
                  },
                })}
              />
              {errors.details && (
                <span className="error">{errors.details.message}</span>
              )}
              <br />
              <div>
                <div className="w-50 pr-1 mr-auto float-left">
                  <input
                    type="number"
                    placeholder="Price"
                    className="form-control"
                    name="price"
                    ref={register({
                      required: "Price is required",
                    })}
                  />
                  {errors.price && (
                    <span className="error">{errors.price.message}</span>
                  )}
                </div>
                <div className="w-50 pl-1 float-right">
                  <label className="custom-file-upload">
                    <input
                      type="file"
                      placeholder="Upload"
                      className="form-control"
                      name="image"
                      ref={register({
                        required: "Image is required",
                      })}
                    />
                    <img src="https://i.imgur.com/B4jPPfH.png" alt="" />
                    Upload Demo
                  </label>
                  {errors.image && (
                    <span className="error">{errors.image.message}</span>
                  )}
                </div>
              </div>

              <input className=" main-button mt-3" type="submit" value="Send" />
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
