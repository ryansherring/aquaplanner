import React from "react";
import { GoogleLogin, useGoogleLogin } from "react-google-login";

const clientId = process.env.OAUTH_CLIENT_ID;

export const Login = () => {

  const onSuccess = (res) => {
    console.log("[login success] currentUser: ", res.profileObj);
  };
  const onFailure = (err) => {
    console.error("Error logging in", err);
  };

  const { signIn } = useGoogleLogin({
    clientId,
    onSuccess,
    onFailure,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <div>
      <button onClick={signIn} className="loginButton">
        <span className="buttonText">sign in with google</span>
      </button>
    </div>
  );
};
