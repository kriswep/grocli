import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from './styled';
import { color, typography, space, flexbox, border } from 'styled-system';

import Text from './Text';
import { colors } from './theme';
import useAuth from './auth/authWrapper';
import makeApolloClient from './apollo';
import GroceryList from './GroceryList';

const HeaderContainer = styled(View)`
  ${color};
  ${space};
  ${flexbox};
  ${border};
`;

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
      {!isAuthenticated && (
        <>
          <View
            css={`
              align-self: center;
              padding: ${props => props.theme.space[5]}px 0;
            `}
          >
            <Text
              accessibilityRole="header"
              css={`
                font-family: nunito-bold;
                font-size: ${props => props.theme.fontSizes[5]}px;
                font-weight: 700;
              `}
            >
              Grocli
            </Text>
          </View>
          <Button title="Log In" onPress={() => auth.login()} />
          <Button title="Sign Up" onPress={() => auth.login(true)} />
        </>
      )}
      {isAuthenticated && client && (
        <ApolloProvider client={client}>
          <GroceryList />
        </ApolloProvider>
      )}
    </View>
  );
};

export default Home;
