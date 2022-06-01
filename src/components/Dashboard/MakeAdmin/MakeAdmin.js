import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../App";
import Sidebar from "../Sidebar/Sidebar";
import SweetAlert from "react-bootstrap-sweetalert";

const MakeAdmin = () => {
  const { register, handleSubmit, errors } = useForm();
  const { loggedInUser } = useContext(UserContext);
  const [formSubmitStatus, setFormSubmitStatus] = useState("");

  const onSubmit = (data) => {
    fetch("https://agency-jahed.herokuapp.com/addAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormSubmitStatus("Admin added successfully");
          document.getElementById("makeAdminForm").reset();
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
            <Col md={3} xs={6}>
              <h4>Make Admin</h4>
            </Col>
            <Col md={{ span: 3, offset: 6 }} xs={6}>
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
              id="makeAdminForm"
              className="w-100"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div
                className=" bg-white p-lg-5 p-3"
                style={{
                  height: "350px",
                  borderRadius: "15px",
                }}
              >
                <input
                  placeholder="Email *"
                  className="form-control w-lg-50 w-100"
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

                <input
                  className=" main-button mt-3"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MakeAdmin;
