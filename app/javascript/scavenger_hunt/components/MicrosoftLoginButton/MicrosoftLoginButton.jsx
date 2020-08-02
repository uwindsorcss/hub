import React, { useState, useEffect } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { useCreateHunterMutation } from "../../data/mutations"
 
const MicrosoftLoginButton = (props) => {
  const [ user, setUser ] = useState({ name: null, email: null });
  const [ errors , setErrors ] = useState(null);

  const [createHunter, { loading }] = useCreateHunterMutation();

  useEffect(() => {
    if (!loading && user.name != null && user.email != null) {
      createHunter({
        variables: {
          input: {
            "email": user.email,
            "name": user.name,
          }
        }
      }).then((res) => {
        console.log(res.data.createHunter.errors);
        setErrors(res.data.createHunter.errors);
      });
    }
  }, [user])

  const authHandler = (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const newUser  = { name: data.authResponseWithAccessToken.account.name, email: data.authResponseWithAccessToken.account.userName }
    setUser(newUser);
  };
 
  return (
      <MicrosoftLogin clientId={process.env.SCAVENGER_HUNT_CLIENT_ID} debug={true} authCallback={authHandler} />
  );
};

export { MicrosoftLoginButton }
