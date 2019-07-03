import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

// const Container = styled.View`
//   flex: 1;
//   background-color: #fff;
//   align-items: center;
//   justify-content: center;
// `;

export default function App() {
  return (
    <View
      css={`
        flex: 1;
        background-color: #fff;
        align-items: center;
        justify-content: center;
      `}
    >
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
