import React from "react";
import AppNavbar from "../../Shared/AppNavbar/AppNavbar";
// import { sendEmailVerification } from "../loginManager";

const VerifyEmail = () => {
  return (
    <>
      <AppNavbar></AppNavbar>
      <div className="form-container">
        <div className="text-center">
          <p>
            Please check your email and confirm your account.
            <br />
            And please Login again.
          </p>
          <button
            disabled={true}
            // onClick={sendEmailVerification}
            className="w-75 btn btn-success"
          >
            Resend
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
