import { createContext } from 'react';
import PropTypes from 'prop-types';

const UserData = {
  userName: PropTypes.string,
  progress: PropTypes.number,
  userRole: PropTypes.string
};

const DefaultUserData = {
  userName: "Default User",
  progress: 0,
  userRole: "guest"
}

const UserDataContext = createContext(DefaultUserData);

export { UserDataContext, UserData};