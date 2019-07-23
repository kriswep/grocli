import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';

import useAuth from './auth/authWrapper';
import makeApolloClient from './apollo';
import Unauthenticated from './Unauthenticated';
import GroceryList from './GroceryList';

const Home = () => {
  const [auth, isAuthenticated] = useAuth();
  const [client, setClient] = useState(null);

  useEffect(() => {
    // create a client with token, when authenticated
    if (auth.token) {
      const createClient = async () => {
        const newClient = await makeApolloClient(auth.token);
        setClient(newClient);
      };
      createClient();
    }
  }, [auth.token]);

  return (
    <View
      css={`
        justify-content: flex-start;
      `}
    >
      {!isAuthenticated && <Unauthenticated />}
      {isAuthenticated && client && (
        <ApolloProvider client={client}>
          <GroceryList />
        </ApolloProvider>
      )}
    </View>
  );
};

export default Home;
