import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId = process.env.OAUTH_CLIENT_ID;

export const Logout = () => {
  const onSuccess = () => {
    alert("Logout made successfully");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};
