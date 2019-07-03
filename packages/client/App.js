import React from 'react';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components';
import { color, flexbox, typography, space } from 'styled-system';

import theme from './src/theme';

const Container = styled.View`
  ${color};
  ${flexbox};
  ${space};
`;

const Info = styled.Text`
  ${color};
  ${typography};
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
        <Info color="text" fontSize="display" px="3">
          Open up App.js to start working on your app!
        </Info>
      </Container>
    </ThemeProvider>
  );
}
