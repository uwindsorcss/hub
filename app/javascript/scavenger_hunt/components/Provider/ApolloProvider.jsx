import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider as ExternalApolloProvider } from 'react-apollo';
import { createCache, createClient } from '../../../utils/apollo';

const ApolloProvider = ({ children }) => (
  <ExternalApolloProvider client={createClient(createCache())}>
    {children}
  </ExternalApolloProvider>
);

ApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ApolloProvider };
