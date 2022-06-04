import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../../firebase.init";
import AppNavbar from "../../Shared/AppNavbar/AppNavbar";
// import { handlePasswordReset } from "../loginManager";

const PasswordRecovery = () => {
  const [resetMessage, setResetMessage] = useState("");
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
    auth
  );

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    await sendPasswordResetEmail(data.email);
    setResetMessage("Please check your email");
  };

  if(error){
    console.log(error);
  }

  return (
    <Container fluid>
      <AppNavbar />
      <section className="text-center mt-5 pt-5">
        <div className="form-container">
          <h3>Recover your password</h3>
          <div>
            <p>
              Please enter an email address and we will send you required
              information to reset your password.
            </p>

            <form
              className="mx-auto"
              style={{ width: "90%" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                placeholder="example@mail.com"
                className="form-control my-3"
                name="resetEmail"
                ref={register({ required: "This field can't be empty" })}
              />
              {errors.resetEmail && (
                <span className="error">{errors.resetEmail.message}</span>
              )}

              <input
                className="form-control my-3"
                style={{ backgroundColor: "red", color: "white" }}
                type="submit"
                value="Reset"
              />
            </form>
            {resetMessage.includes("Please") ? (
              <span style={{ color: "green" }}>{resetMessage}</span>
            ) : (
              <span className="error">{resetMessage}</span>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default PasswordRecovery;
