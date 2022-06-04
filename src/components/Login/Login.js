import React, { useState } from "react";
import { Container } from "react-bootstrap";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import "./Login.css";

const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/'
  const [isNewUser, setIsNewUser] = useState(true);

  const { register, handleSubmit, errors, getValues } = useForm();
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const [
    createUserWithEmailAndPassword,
    createUser,
    createUserloading,
    createUsererror,
  ] = useCreateUserWithEmailAndPassword(auth);

  const onSubmit = async (data) => {
    const name = data.firstName + " " + data.lastName;
    const email = data.email;
    const password = data.password;

    if (isNewUser) {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName: name });
    } else {
      signInWithEmailAndPassword(email, password);
    }
  };
  
  if (user) {
    navigate(from,{replace: true});
  }

  if (error) {
    console.log("error");
  }

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Container className="login-container my-5">
      <div className="text-center w-lg-75 w-100 mx-auto pr-4 my-4">
        {/* <img
          className="w-25"
          onClick={() => history.push("/")}
          src="https://i.imgur.com/UMV8bTj.png"
          alt=""
        /> */}
        <Link to="/">
          <img className="w-25" src="https://i.imgur.com/UMV8bTj.png" alt="" />
        </Link>
      </div>
      <div className="form-container">
        <div className="m-auto input-form-container">
          <h4>{isNewUser ? "Create an account" : "Sign In"}</h4>
          <form className="signing-form" onSubmit={handleSubmit(onSubmit)}>
            {isNewUser && (
              <input
                placeholder="First Name"
                className="form-control"
                name="firstName"
                ref={register({
                  required: "Name is required",
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message:
                      "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
            )}
            {errors.firstName && (
              <span className="error">{errors.firstName.message}</span>
            )}

            {isNewUser && (
              <input
                placeholder="Last Name"
                className="form-control"
                name="lastName"
                ref={register({
                  required: "Name is required",
                  pattern: {
                    value: /[A-Za-z]{3}/,
                    message:
                      "Name must contain minimum 3 letter and only letter", // <p>error message</p>
                  },
                })}
              />
            )}
            {errors.lastName && (
              <span className="error">{errors.lastName.message}</span>
            )}

            <input
              placeholder="Your Email"
              className="form-control"
              name="email"
              ref={register({
                required: "Email required",
                pattern: {
                  value:
                    /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <input
              placeholder="Enter a password"
              type="password"
              className="form-control"
              name="password"
              ref={register({
                required: "Password required",
                pattern: {
                  value: /^([a-zA-Z0-9@*#]{8,15})$/,
                  message:
                    "Password must contain Small and capital letter, Number and any character. It should be 8-15 char long",
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}

            {isNewUser && (
              <input
                placeholder="Confirm password"
                type="password"
                className="form-control"
                name="confirm"
                ref={register({
                  required: true,
                  validate: (val) =>
                    val === getValues("password") || "Password don't match",
                })}
              />
            )}
            {errors.confirm && (
              <span className="error">{errors.confirm.message}</span>
            )}

            <input
              className="form-control main-button"
              type="submit"
              value={isNewUser ? "Sign Up" : "Sign In"}
            />
            <input
              onClick={() => setIsNewUser(!isNewUser)}
              type="button"
              className="form-control toggle-btn text-center"
              value={
                isNewUser ? "Already have an account?" : "Create new account"
              }
            ></input>
          </form>
          {error && (
            <span className="error">
              {error.message} <br />{" "}
            </span>
          )}
          {!isNewUser && (
            <Link style={{ color: "#f6b204" }} to="/passwordRecovery">
              Forget password?
            </Link>
          )}
          {!isNewUser && (
            <div>
              <h6 className="or-line">
                <span>Or</span>
              </h6>
              <div
                onClick={() => signInWithGoogle()}
                className="login-alternative"
              >
                <img src="https://i.imgur.com/P9ZVhek.png" alt="" />
                <h6 className="mt-1">Sign in with google</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Login;
