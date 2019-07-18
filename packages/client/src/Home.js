import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';

import useAuth from './auth/authWrapper';
import makeApolloClient from './apollo';
import GroceryList from './GroceryList';

const Home = () => {
  const [auth, isAuthenticated] = useAuth();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // create a client with token, when authenticated
    if (auth.token) {
      const createClient = async () => {
        const newClient = await makeApolloClient();
        setClient(newClient);
      };
      createClient();
    }
  }, [auth.token]);

  return (
    <>
      {!isAuthenticated && (
        <Button title="Log in with Auth0" onPress={auth.login} />
      )}
      {isAuthenticated && client && (
        <ApolloProvider client={client}>
          <GroceryList />
        </ApolloProvider>
      )}
    </>
  );
};

export default Home;
