import {
  faList,
  faPlus,
  faShoppingCart,
  faSignOutAlt,
  faStickyNote,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import auth from "../../../firebase.init";
import "./Sidebar.css";
// import { handleSignOut } from "../../Login/loginManager";

const Sidebar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  // let history = useHistory();
  const navigate = useNavigate()

  // const signOut = () => {
  //   handleSignOut().then((res) => {
  //     setLoggedInUser(res);
  //     history.replace("/");
  //   });
  // };

  return (
    <div className="sidebar-container ">
      <Link to='/'>
      <img
        // onClick={() => history.push("/")}
        className="w-lg-75 w-100 h-100 mt-4"
        src="https://i.imgur.com/UMV8bTj.png"
        alt=""
      />
      </Link>
      <div style={{ height: "650" }} className="mt-5 pb-sm-5">
        {loggedInUser.isAdmin ? (
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
        ) : (
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
        <Button onClick={()=>signOut(auth)} variant="danger">LogoOut <FontAwesomeIcon title="LogOut" icon={faSignOutAlt}></FontAwesomeIcon></Button>
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
