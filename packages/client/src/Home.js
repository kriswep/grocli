import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { useAuthState } from './auth/authWrapper';
import makeApolloClient from './apollo';
import Unauthenticated from './Unauthenticated';
import GroceryList from './GroceryList';

const Home = () => {
  const [auth, isAuthenticated] = useAuthState();
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
    <>
      {!isAuthenticated && <Unauthenticated />}
      {isAuthenticated && client && (
        <ApolloProvider client={client}>
          <GroceryList />
        </ApolloProvider>
      )}
    </>
  );
};

export default Home;
