import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './src/auth/authWrapper';
import theme from './src/theme';
import Home from './src/Home';

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
          <SafeAreaView
            css={`
              flex: 1;
              flex-direction: column;
              justify-content: flex-start;
              align-self: stretch;
              align-items: stretch;
              background-color: ${props => props.theme.colors.background};
            `}
          >
            <StatusBar
              backgroundColor="#1a202c"
              barStyle="light-content"
              translucent={false}
            />
            <Home />
          </SafeAreaView>
        </AuthProvider>
      )}
    </ThemeProvider>
  );
};

export default App;
