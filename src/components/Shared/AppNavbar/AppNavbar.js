import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import auth from "../../../firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import "./AppNavbar.css";

const AppNavbar = () => {
  const { loggedInUser } = useContext(UserContext);
  const [user,loading,error] = useAuthState(auth)
  const [isAdmin] = useAdmin(user)
  console.log(isAdmin);
  return (
    <Container className="nav-container" fluid>
      <Navbar collapseOnSelect expand="lg">
        <Link to="/">
          <Navbar.Brand>
            <img
              className="logo"
              src="https://i.imgur.com/UMV8bTj.png"
              alt=""
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {isAdmin ? (
              <Nav.Link href="/adminServicesList">Dashboard</Nav.Link>
            ) : (
              <Nav.Link href="/order">Dashboard</Nav.Link>
            )}
            <Nav.Link href="#team">Our Team</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
            <Nav>
              {user ? (
                <Button
                  onClick={() => signOut(auth)}
                  className=""
                  variant="dark"
                >
                  Sign Out
                </Button>
              ) : (
                <Link to="/login">
                  <Button className="" variant="dark">
                    Login
                  </Button>
                </Link>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default AppNavbar;
