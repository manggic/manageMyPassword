import React, { Fragment, useContext, useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.css";
import { Redirect } from "react-router-dom";
import { Context } from "./Context";
import { ToastContainer, toast } from "react-toastify";

//import { firebaseConfig } from './firebase';
import firebase from "firebase";
import { Alert } from "reactstrap";
//firebase.initializeApp(firebaseConfig);

const SignIn = () => {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithFirebase = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        let email = user.user.email;
        let uid = user.user.uid;
        console.log("user :", user, user.user.email);
        context.setUser({ email, uid });
        setError("");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("SignIN error: ", errorMessage);
        setError(errorMessage);
      });
  };

  const handleSubmit = (e) => {
    console.log("signIn submit");
    e.preventDefault();
    signInWithFirebase();
    // context.setUser( { email  }    )
    // console.log('SignIn', context  );
  };

  console.log("SignIn --->", context);

  if (context?.user?.email) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signin">
      {error ? (
        <Alert class="alert" color="danger">
          {error}
        </Alert>
      ) : (
        ""
      )}

      {/* SignIn */}
      <form class="form-signin" onSubmit={handleSubmit}>
        {/* <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/> */}
        <h1 style={{ textAlign: "center" }} class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
        {/* <label for="inputEmail" class="sr-only">
            Email address
          </label> */}
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required=""
          autoFocus=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <label for="inputPassword" class="sr-only">
            Password
          </label> */}
        <input
          type="password"
          id="inputPassword"
          class="form-control mt-3"
          placeholder="Password"
          required=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div class="checkbox mb-3 float-left mt-1">
          <label>
            <input className="" type="checkbox" value="remember-me" />
            Remember me
          </label>
        </div> */}
        <button
          style={{ background: "#697b87", marginTop: "25px", color: "azure" }}
          class="btn btn-md  btn-block"
          type="submit"
        >
          Sign in
        </button>
      </form>
      {context?.user?.email}
    </div>
  );
};

export default SignIn;
