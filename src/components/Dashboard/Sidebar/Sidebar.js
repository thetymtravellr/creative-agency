import {
  faList,
  faPlus,
  faShoppingCart,
  faSignOutAlt,
  faStickyNote,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import useAdmin from "../../../hooks/useAdmin";
import "./Sidebar.css";
// import { handleSignOut } from "../../Login/loginManager";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [isAdmin] = useAdmin(user);
  const navigate = useNavigate();

  return (
    <div className="sidebar-container ">
      <Link to="/">
        <img
          onClick={() => navigate("/")}
          className="w-lg-75 w-100 h-100 mt-4"
          src="https://i.imgur.com/UMV8bTj.png"
          alt=""
        />
      </Link>
      <div style={{ height: "650" }} className="mt-5 pb-sm-5">
        {isAdmin && (
          <>
            <Link to="/adminServicesList">
              <FontAwesomeIcon
                title="Services Admin"
                icon={faList}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">Services Admin</span>
            </Link>
            <Link to="/addService">
              <FontAwesomeIcon
                title="Services Admin"
                icon={faPlus}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">AddServices</span>
            </Link>
            <Link to="/makeAdmin">
              <FontAwesomeIcon
                title="MakeAdmin"
                icon={faUserPlus}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">MakeAdmin</span>
            </Link>
          </>
        )}
        {!isAdmin && (
          <>
            <Link to="/order">
              <FontAwesomeIcon
                title="Order"
                icon={faShoppingCart}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">Order</span>
            </Link>
            <br />
            <Link to="/serviceList">
              <FontAwesomeIcon
                title="ServiceList"
                icon={faList}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">ServiceList</span>
            </Link>
            <br />
            <Link to="/addReview">
              <FontAwesomeIcon
                title="Review"
                icon={faStickyNote}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">Review</span>
            </Link>
          </>
        )}

        <div className="my-5"></div>
        <Button onClick={() => signOut(auth)} variant="danger">
          LogoOut{" "}
          <FontAwesomeIcon title="LogOut" icon={faSignOutAlt}></FontAwesomeIcon>
        </Button>
        {/* <button
          
          style={{ color: "red", marginTop: "50px" }}
        >
          
          &nbsp;&nbsp;<span className="d-md-inline-block d-none">LogOut</span>
        </button> */}

        <br />
      </div>
    </div>
  );
};

export default Sidebar;
