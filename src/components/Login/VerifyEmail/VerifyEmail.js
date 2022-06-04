import React from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import AppNavbar from "../../Shared/AppNavbar/AppNavbar";
// import { sendEmailVerification } from "../loginManager";

const VerifyEmail = () => {
  const [user] = useAuthState(auth)
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

  const sendVerification = async () => {
    await sendEmailVerification();
  }

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
            onClick={sendVerification}
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
