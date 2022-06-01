import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AddReview from "./components/Dashboard/AddReview/AddReview";
import AddService from "./components/Dashboard/AddService/AddService";
import AdminServiceList from "./components/Dashboard/AdminServiceList/AdminServiceList";
import MakeAdmin from "./components/Dashboard/MakeAdmin/MakeAdmin";
import Order from "./components/Dashboard/Order/Order";
import ServiceList from "./components/Dashboard/ServiceList/ServiceList";
import Home from "./components/Home/Home/Home";
import Login from "./components/Login/Login";
import PasswordRecovery from "./components/Login/PasswordRecovery/PasswordRecovery";
import VerifyEmail from "./components/Login/VerifyEmail/VerifyEmail";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/verifyEmail">
            <VerifyEmail />
          </Route>
          <Route path="/passwordRecovery">
            <PasswordRecovery />
          </Route>

          {loggedInUser.isAdmin ? (
            <>
              <PrivateRoute path="/makeAdmin">
                <MakeAdmin />
              </PrivateRoute>
              <PrivateRoute path="/addService">
                <AddService />
              </PrivateRoute>
              <PrivateRoute path="/adminServicesList">
                <AdminServiceList />
              </PrivateRoute>
            </>
          ) : (
            <>
              <PrivateRoute path="/order">
                <Order />
              </PrivateRoute>
              <PrivateRoute path="/serviceList">
                <ServiceList />
              </PrivateRoute>
              <PrivateRoute path="/addReview">
                <AddReview />
              </PrivateRoute>
            </>
          )}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
