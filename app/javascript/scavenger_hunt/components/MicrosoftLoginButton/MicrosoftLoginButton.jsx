import React from "react";
import MicrosoftLogin from "react-microsoft-login";

const SCAVENGER_HUNT_CLIENT_ID = '819d4ee7-63c4-4df1-aa7d-730b05e1fe7b';
 
const MicrosoftLoginButton = (props) => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };
 
  return (
    <MicrosoftLogin clientId={SCAVENGER_HUNT_CLIENT_ID} authCallback={authHandler} />
  );
};

export { MicrosoftLoginButton }
