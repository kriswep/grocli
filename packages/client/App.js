import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { color, flexbox, space } from 'styled-system';

import styled from './src/styled';
import theme from './src/theme';
import Home from './src/Home';

const Container = styled(SafeAreaView)`
  ${color};
  ${flexbox};
  ${space};
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
        <StatusBar
          backgroundColor="#1a202c"
          barStyle="light-content"
          translucent={false}
        />
        <Home />
      </Container>
    </ThemeProvider>
  );
};

export default App;
