import React from "react";
import MicrosoftLogin from "react-microsoft-login";
 
const MicrosoftLoginButton = (props) => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };
 
  return (
    <MicrosoftLogin clientId={process.env.SCAVENGER_HUNT_CLIENT_ID} authCallback={authHandler} />
  );
};

export { MicrosoftLoginButton }
