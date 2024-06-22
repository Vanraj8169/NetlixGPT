import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/2f8ae902-8efe-49bb-9a91-51b6fcc8bf46/IN-en-20240617-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="background image"
          className="w-full h-full object-cover"
        />
      </div>
      <form className="absolute p-6 sm:p-12 bg-black w-full sm:w-3/12 mx-auto my-24 right-0 left-0 text-white rounded-lg bg-opacity-80 z-10">
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
          placeholder="Email address"
          className="p-2 my-4 sm:my-6 w-full bg-gray-600 outline-white rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 sm:my-6 w-full bg-gray-600 outline-white rounded-md"
        />
        <button className="p-3 sm:p-4 my-4 sm:my-6 bg-red-700 w-full rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 underline cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
