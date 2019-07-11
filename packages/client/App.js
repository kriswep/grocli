import React from 'react';
import { SafeAreaView, StatusBar, Text, AsyncStorage } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { color, flexbox, space } from 'styled-system';
import { ApolloProvider } from '@apollo/react-hooks';
import makeApolloClient from './src/apollo';

import styled from './src/styled';
import theme from './src/theme';
import GroceryList from './src/GroceryList';

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
    // fetch session
    // const session = await AsyncStorage.getItem('@todo-graphql:session');
    // const sessionObj = JSON.parse(session);
    // const { token, id } = sessionObj;
    // // make apollo client with this session token
    // const client = makeApolloClient(token);
    const client = makeApolloClient();
    // start emitting events saying that the useri s online
    this.setState({ client });
  }

  render() {
    if (!this.state.client) {
      return <Text>Loading</Text>;
    }
    console.log(this.state.client);

    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={this.state.client}>
          <StatusBar
            backgroundColor="#1a202c"
            barStyle="light-content"
            translucent={false}
          />
          <Container
            color="white"
            bg="background"
            alignItems="stretch"
            alignSelf="stretch"
            justifyContent="center"
            css={`
              flex: 1;
            `}
            flexDirection="column"
          >
            <GroceryList />
          </Container>
        </ApolloProvider>
      </ThemeProvider>
    );
  }
}
