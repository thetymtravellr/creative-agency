import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import { UserContext } from "../../../App";
import auth from "../../../firebase.init";
import Sidebar from "../Sidebar/Sidebar";
import "./ServiceList.css";

const ServiceList = () => {
  const [user] = useAuthState(auth)
  const [serviceList, setServiceList] = useState([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  console.log(user.email);
  useEffect(() => {
    fetch(
      "http://localhost:5000/getOrders?email=" + user.email
    )
      .then((res) => res.json())
      .then((data) => {
        setServiceList(data);
        setLoading(false);
      });
  }, [loggedInUser.email, isCancelled, user.email]);

  const handelCancel = (id) => {
    setLoading(true);
    fetch("http://localhost:5000/cancelOrder/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsCancelled(true);
        }
      });
  };

  return (

    <Container fluid>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col className="mt-4" xs={10}>
          <Row>
            <Col md={3} sm={6}>
              <h4>Your Service List</h4>
            </Col>
            <Col md={{ span: 3, offset: 6 }} sm={6}>
              <h5>{loggedInUser.name}</h5>
            </Col>
          </Row>
          <div
            className="mt-3 p-5"
            style={{ backgroundColor: "#E5E5E5", height: "600px" }}
          >
            {!serviceList && !loading ? (
              <h1>No Item Available</h1>
            ) : (
              <LoadingMask loading={loading} loadingText={"Loading...."}>
                <div style={{ height: "550px", overflow: "scroll" }}>
                  <Row>
                    {serviceList.map((service) => (
                      <Col className="my-2" md={5} sm={12}>
                        <div className="single-client-service">
                          <Row>
                            <Col xs={3}>
                              <img
                                rounded
                                src={`data:image/png;base64,${service.image.img}`}
                                alt=""
                              />
                            </Col>
                            {service.status === "Pending" ? (
                              <Col sm={6} md={{ span: 5, offset: 4 }}>
                                <button
                                  className={`service-btn btn-${service.status}`}
                                >
                                  {service.status}
                                </button>{" "}
                                <OverlayTrigger
                                  key={service._id}
                                  placement="top"
                                  overlay={<Tooltip>Cancel Order</Tooltip>}
                                >
                                  <FontAwesomeIcon
                                    onClick={() => handelCancel(service._id)}
                                    style={{ color: "red" }}
                                    icon={faTimes}
                                  ></FontAwesomeIcon>
                                </OverlayTrigger>
                              </Col>
                            ) : (
                              <Col sm={6} md={{ span: 4, offset: 5 }}>
                                <button
                                  className={`service-btn btn-${service.status}`}
                                >
                                  {service.status}
                                </button>
                              </Col>
                            )}
                          </Row>
                          <h4>{service.category}</h4>
                          <p className="text-secondary"> {service.details} </p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </LoadingMask>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceList;
