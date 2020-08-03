import React, { useState, useEffect } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useSigInHunterMutation } from "../../data/mutations"
 
const MicrosoftLoginButton = (props) => {
  const [ user, setUser ] = useState({ name: null, email: null });

  const [signInHunter, { loading }] = useSigInHunterMutation();

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
        props.onSignIn(res.data.signIn.hunter)
        // Redirect to /hunt/homepage
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
      <MicrosoftLogin clientId={process.env.SCAVENGER_HUNT_CLIENT_ID} authCallback={authHandler} />
  );
};

export { MicrosoftLoginButton }
