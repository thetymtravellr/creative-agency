import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import { UserContext } from "../../../App";
import auth from "../../../firebase.init";
import Sidebar from "../Sidebar/Sidebar";
import "./AdminServiceList.css";
import AdminServicesTableRow from "./AdminServicesTableRow/AdminServicesTableRow";

const AdminServiceList = () => {
  const [user] = useAuthState(auth)
  const [serviceList, setServiceList] = useState([]);
  const { loggedInUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/getOrders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setServiceList(data);
        setLoading(false);
      });
  }, [user.email]);

  const handleOnBlur = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    setLoading(true);
    fetch(
      "https://agency-jahed.herokuapp.com/searchInOrder?searchTxt=" + searchText
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setServiceList(data);
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
              <h4>All Services</h4>
            </Col>
            <Col md={{ span: 3, offset: 6 }} xs={6}>
              <h5>{loggedInUser.name}(Admin)</h5>
            </Col>
          </Row>
          <div
            className="mt-3 p-3"
            style={{ backgroundColor: "#E5E5E5", height: "600px" }}
          >
            <LoadingMask loading={loading} loadingText={"Loading...."}>
              <div
                className=" bg-white"
                style={{
                  overflow: "scroll",
                  height: "550px",
                  borderRadius: "15px",
                  padding: "20px",
                }}
              >
                <Row>
                  <Col sm={12} md={12} lg={6}>
                    <div className="form-group w-lg-25 w-sm-100">
                      <Row>
                        <Col xs={8}>
                          <input
                            onBlur={(e) => handleOnBlur(e)}
                            className="form-control"
                            placeholder="Search Email(Partial supported)"
                            type="text"
                            name="searchTxt"
                            id=""
                          />
                        </Col>
                        <Col xs={4}>
                          <button
                            onClick={handleSearchClick}
                            className="btn main-button w-100"
                          >
                            Search
                          </button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <Table className="text-center">
                  <thead className="rounded">
                    <tr className="table-head-row">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Service</th>
                      <th>Project Details</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceList.map((service) => (
                      <AdminServicesTableRow
                        key={service._id}
                        service={service}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </LoadingMask>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminServiceList;
