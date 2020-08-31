import { useContext } from "react";

import { UserDataContext } from "../../context";
import { useUpdateUserMutation } from '../../data/mutations'

const useUserData = () => {
  const userData = useContext(UserDataContext);

  const setUserData = (updateData) => {
    useUpdateUserMutation({
      variables: {
        input: {
          ...updateData,
        }
      }
    });
  };

  return [userData, setUserData];
};

export { useUserData };
