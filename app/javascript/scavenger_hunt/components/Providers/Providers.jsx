import React from 'react';
import PropTypes from 'prop-types';

import { UserDataContext, UserData } from "../../context";
import { ApolloProvider } from "./ApolloProvider";

const Providers = ({ children, userData }) => {
  return(
    <UserDataContext.Provider value={userData}>
      <ApolloProvider>
        {children}
      </ApolloProvider>
  </UserDataContext.Provider>
  );
};

Providers.propTypes = {
  children: PropTypes.element.isRequired,
  userData: PropTypes.shape(UserData)
};

export { Providers };