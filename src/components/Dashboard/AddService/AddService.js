import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import SweetAlert from "react-bootstrap-sweetalert";

const AddService = () => {
  const { register, handleSubmit, errors } = useForm();
  const { loggedInUser } = useContext(UserContext);
  const [formSubmitStatus, setFormSubmitStatus] = useState("");

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("details", data.details);
    formData.append("file", data.logo[0]);

    fetch("https://agency-jahed.herokuapp.com/addService", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormSubmitStatus("Service added successfully");
          document.getElementById("addServiceForm").reset();
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
              <h4>Add Service</h4>
            </Col>
            <Col md={{ span: 4, offset: 5 }} sm={6}>
              <h5>{loggedInUser.name}(Admin)</h5>
            </Col>
          </Row>
          <div
            className="mt-3 p-lg-5 p-3 w-lg-50 w-100"
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
              id="addServiceForm"
              className="w-100 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className=" bg-white p-lg-5 p-3"
                style={{
                  height: "380px",
                  borderRadius: "15px",
                }}
              >
                <Row>
                  <Col className="py-2" md={6} sm={12}>
                    <div className="form-group">
                      <label htmlFor="name">Title</label>
                      <input
                        placeholder="Title"
                        className="form-control"
                        name="title"
                        ref={register({
                          required: "Title is required",
                          pattern: {
                            value: /[A-Za-z]{3}/,
                            message:
                              "Title must contain minimum 3 letter and only letter", // <p>error message</p>
                          },
                        })}
                      />
                      {errors.title && (
                        <span className="error">{errors.title.message}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="name">Description</label>
                      <textarea
                        placeholder="Project Details"
                        rows="4"
                        className="form-control"
                        name="details"
                        ref={register({
                          required: "Project Details required",
                          pattern: {
                            value: /^([a-zA-Z0-9 ]{10,400})/,
                            message:
                              "Project Details must contain be 10-40 char ",
                          },
                        })}
                      />
                      {errors.details && (
                        <span className="error">{errors.details.message}</span>
                      )}
                    </div>
                  </Col>
                  <Col className="py-2" md={6} sm={12}>
                    <div className="form-group">
                      <label htmlFor="">Upload logo</label>
                      <label className="custom-file-upload">
                        <input
                          type="file"
                          placeholder="Upload"
                          className="form-control"
                          name="logo"
                          ref={register({
                            required: "Logo is required",
                          })}
                        />
                        <img src="https://i.imgur.com/B4jPPfH.png" alt="" />
                        Upload logo
                      </label>
                      {errors.logo && (
                        <span className="error">{errors.logo.message}</span>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
              <Row>
                <Col
                  className="text-right mt-md-3 py-2"
                  md={{ span: 3, offset: 9 }}
                  sm={12}
                >
                  <input className="main-button" type="submit" value="Save" />
                </Col>
              </Row>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddService;
