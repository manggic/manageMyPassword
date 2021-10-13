import React, { Fragment, useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import { Alert } from "reactstrap";

import "./SignUp.css";

import { firebaseConfig } from "./firebase";
import firebase from "firebase";
firebase.initializeApp(firebaseConfig);
// import firebase from "firebase/app"
// import "firebase/database";
// import "firebase/storage"
var db = firebase.firestore();

const SignUp = () => {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log("SignUp --->", context);

  const defaultSet = () => {
    console.log("setUser --> ", context.user);

    db.collection(context.user.uid)
      .doc("data")
      .set({
        Facebook: { email: [], password: [] },
        Google: { email: [], password: [] },
        Amazon: { email: [], password: [] },
        Manish: { email: [], password: [] },
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  if (context?.user?.email) defaultSet();

  const signUpWithFirebase = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        let email = user.user.email;
        let uid = user.user.uid;

        console.log("Response of signup  ----> ", user, email, uid);
        context.setUser({ email, uid });
        //defaultSet()
        //  toast.error(' Wow so easy!', {
        //   position: "top-left",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   });
        setError("");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("firebase Signup error:", errorMessage);
        // toast(`${errorMessage}`, { type : "error" })
        setError(errorMessage);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // context.setUser(  { email   })
    signUpWithFirebase();
  };

  if (context?.user?.email) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup">
      {error ? (
        <Alert class="alert" color="danger">
          {error}
        </Alert>
      ) : (
        ""
      )}

      <form class="form-signup" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }} class="h3 mb-3 font-weight-normal">
          Sign Up
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
          class="form-control mt-2"
          placeholder="Password"
          required=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <div class="checkbox mb-3 float-left mt-1">
            <label>
              <input className="" type="checkbox" value="remember-me" />{" "}
              Remember me
            </label>
          </div> */}
        <button
          style={{ background: "#697b87", marginTop: "25px", color: "azure" }}
          class="btn btn-md btn-block"
          type="submit"
        >
          Sign up
        </button>
      </form>
      {email}
      {password}
    </div>
  );
};

export default SignUp;
