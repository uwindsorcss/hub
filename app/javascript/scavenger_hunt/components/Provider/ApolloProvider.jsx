import React from 'react';
import { ApolloProvider as ExternalApolloProvider } from 'react-apollo';
import { createCache, createClient } from '../../../utils/apollo';

const ApolloProvider = ({ children }) => (
  <ExternalApolloProvider client={createClient(createCache())}>
    {children}
  </ExternalApolloProvider>
);

export { ApolloProvider };