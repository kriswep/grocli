import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { color, flexbox, space } from 'styled-system';

import styled from './src/styled';
import theme from './src/theme';
import GroceryList from './src/GroceryList';

const Container = styled(SafeAreaView)`
  ${color};
  ${flexbox};
  ${space};
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
