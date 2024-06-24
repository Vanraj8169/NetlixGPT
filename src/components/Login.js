import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/helper";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // Validate the form data
    const error = checkValidData(email.current.value, password.current.value);
    setErrorMessage(error);
    if (error) return;
    // Sign In/ Sign Up
    if (isSignInForm) {
      // Sign in authentication
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Invalid email or password");
        });
    } else {
      // Sign up authentication
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          navigate("/browse");

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          errorCode === "auth/email-already-in-use"
            ? setErrorMessage("Email already in use")
            : setErrorMessage("Invalid email or password");

          // ..
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setErrorMessage("Please try again");
      });
  };
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/2f8ae902-8efe-49bb-9a91-51b6fcc8bf46/IN-en-20240617-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="background image"
          className="bg-cover w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-6 sm:p-12 bg-black w-full sm:w-3/12 mx-auto my-24 right-0 left-0 text-white rounded-lg bg-opacity-80 z-10"
      >
        <h1 className="font-bold text-xl sm:text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-4 sm:my-6 w-full bg-gray-600 outline-white rounded-md"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email address"
          className="p-2 my-4 sm:my-6 w-full bg-gray-600 outline-white rounded-md"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 my-4 sm:my-6 w-full bg-gray-600 outline-white rounded-md"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-3 sm:p-4 my-4 sm:my-6 bg-red-700 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && <p className="text-center text-white">OR</p>}
        {isSignInForm && (
          <button
            className="flex items-center justify-center p-3 sm:p-4 my-4 sm:p-4 my-4 sm:my-6 bg-blue-600 w-full rounded-md"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://user-images.githubusercontent.com/194400/70987158-4069c900-20b7-11ea-892e-8a2e1166b6b7.png"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
        )}
        <p className="underline cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
