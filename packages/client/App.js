import React from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { color, flexbox, space } from 'styled-system';

import styled from './src/styled';
import theme from './src/theme';
import GroceryList from './src/GroceryList';

const Container = styled(View)`
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
        alignItems="center"
        justifyContent="center"
        css={`
          flex: 1;
        `}
      >
        <GroceryList />
      </Container>
    </ThemeProvider>
  );
}
