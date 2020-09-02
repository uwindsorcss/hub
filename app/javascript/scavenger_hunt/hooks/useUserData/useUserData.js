import { useContext } from "react";

import { UserDataContext } from "../../context";

const useUserData = () => {
  const userData = useContext(UserDataContext);
  return userData;
};

export { useUserData };