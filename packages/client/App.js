import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components';
import { color, flexbox, space } from 'styled-system';

import { AuthProvider } from './src/auth/authWrapper';
import styled from './src/styled';
import theme from './src/theme';
import Home from './src/Home';

const Container = styled(SafeAreaView)`
  ${color};
  ${flexbox};
  ${space};
`;

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        nunito: require('./assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {fontLoaded && (
        <AuthProvider>
          <Container
            bg="background"
            alignItems="stretch"
            alignSelf="stretch"
            justifyContent="center"
            css={`
              flex: 1;
              justify-content: flex-start;
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
        </AuthProvider>
      )}
    </ThemeProvider>
  );
};

export default App;
