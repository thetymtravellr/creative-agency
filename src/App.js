import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verifyEmail" element={<VerifyEmail />}></Route>
        <Route path="/passwordRecovery" element={<PasswordRecovery />}></Route>
        <Route
          path="/makeAdmin"
          element={
            <PrivateRoute>
              <MakeAdmin />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/addService"
          element={
            <PrivateRoute>
              <AddService />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/adminServicesList"
          element={
            <PrivateRoute>
               <AdminServiceList />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/order"
          element={
            <PrivateRoute>
               <Order />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/serviceList"
          element={
            <PrivateRoute>
               <ServiceList />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/addReview"
          element={
            <PrivateRoute>
               <AddReview />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
