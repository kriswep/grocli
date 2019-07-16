import React from 'react';
import { SafeAreaView, StatusBar, Text, AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { color, flexbox, space } from 'styled-system';
import { ApolloProvider } from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';
// import { AuthSession } from 'expo';

import styled from './src/styled';
import theme from './src/theme';
import GroceryList from './src/GroceryList';
import Session from './src/auth/Session';

const Container = styled(SafeAreaView)`
  ${color};
  ${flexbox};
  ${space};
`;

export default class App extends React.Component {
  state = {
    client: null,
  };
  async componentDidMount() {
    // const redirectUrl = AuthSession.getRedirectUrl();
    // console.log(`Redirect URL: ${redirectUrl}`);
    // fetch session
    // const session = await AsyncStorage.getItem('@todo-graphql:session');
    // const sessionObj = JSON.parse(session);
    // const { token, id } = sessionObj;
    // // make apollo client with this session token
    // const client = makeApolloClient(token);
    const client = await makeApolloClient();
    // start emitting events saying that the useri s online
    this.setState({ client });
  }

  render() {
    if (!this.state.client) {
      return <Text>Loading</Text>;
    }

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={this.state.client}>
          <StatusBar
            backgroundColor="#1a202c"
            barStyle="light-content"
            translucent={false}
          />
          <Container
            bg="background"
            alignItems="stretch"
            alignSelf="stretch"
            justifyContent="center"
            css={`
              flex: 1;
            `}
            flexDirection="column"
          >
            <Session />
            <GroceryList />
          </Container>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}
