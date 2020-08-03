import React, { useState, useEffect } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useSignInHunterMutation } from "../../data/mutations"
 
const MicrosoftLoginButton = (props) => {
  let REDIRECT_URI = "https://css.uwindsor.ca/hunt/auth/microsoft_graph";
  const [ user, setUser ] = useState({ name: null, email: null });

  const [signInHunter, { loading }] = useSignInHunterMutation();
  
  if(process.env.NODE_ENV == "development") {
    REDIRECT_URI = "http://localhost:3000/hunt/auth/microsoft_graph";
  } else {
    REDIRECT_URI = "https://css.uwindsor.ca/hunt/auth/microsoft_graph";
  }

  useEffect(() => {
    if (!loading && user.name != null && user.email != null) {
      signInHunter({
        variables: {
          input: {
            "email": user.email,
            "name": user.name,
          }
        }
      }).then((res) => {
        console.log(res.data.signIn.hunter);
        window.location.href = "/hunt/homepage";
      });
    }
  }, [user])

  const authHandler = (err, data) => {
    if (err) {
      // We don't have any other way to handle this error thus throwing it.
      throw new Error('Error from Microsoft login');
    }
    const newUser  = { name: data.authResponseWithAccessToken.account.name, email: data.authResponseWithAccessToken.account.userName }
    setUser(newUser);
  };
 
  return (
      <MicrosoftLogin clientId={process.env.SCAVENGER_HUNT_CLIENT_ID} redirectUri={REDIRECT_URI} authCallback={authHandler} />
  );
};

export { MicrosoftLoginButton }
