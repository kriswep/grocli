import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Text from './Text';
// import useAuth from './auth/authWrapper';
import { useAuthState } from './auth/authWrapper';

const Unauthenticated = () => {
  const [auth, isAuthenticated] = useAuthState();

  if (isAuthenticated) return <Text>Auth</Text>;

  return (
    <>
      <View
        css={`
          padding: ${props => props.theme.space[5]}px 0;
          background-color: ${props => props.theme.colors.white};
        `}
      >
        <Text
          accessibilityRole="header"
          css={`
            align-self: center;
            color: ${props => props.theme.colors.black};
            font-family: nunito-bold;
            font-size: ${props => props.theme.fontSizes[5]}px;
            font-weight: 700;
          `}
        >
          Grocli
        </Text>
      </View>
      <View
        css={`
          padding-top: ${props => props.theme.space[6]}px;
          align-items: center;
        `}
      >
        <Text
          css={`
            color: ${props => props.theme.colors.white};
            font-family: nunito-bold;
            font-size: ${props => props.theme.fontSizes[4]}px;
            font-weight: 700;
            margin-bottom: ${props => props.theme.space[4]}px;
          `}
        >
          Tickets please!
        </Text>
        <TouchableOpacity
          accessibilityLabel="Log In"
          css={`
            align-items: center;
            border-radius: ${props => props.theme.space[4]}px;
            background-color: ${props => props.theme.colors.white};
            margin: ${props => props.theme.space[2]}px 0;
            padding: ${props => props.theme.space[2]}px
              ${props => props.theme.space[3]}px;
            min-width: ${props => props.theme.sizes[6]}px;
          `}
          onPress={() => auth.login()}
        >
          <Text
            css={`
              color: ${props => props.theme.colors.black};
              font-family: nunito-bold;
              font-size: ${props => props.theme.fontSizes[3]}px;
              font-weight: 700;
            `}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Sign Up"
          css={`
            align-items: center;
            border-radius: ${props => props.theme.space[4]}px;
            background-color: ${props => props.theme.colors.black};
            border: solid ${props => props.theme.colors.white}
              ${props => props.theme.sizes.fine}px;
            margin: ${props => props.theme.space[2]}px 0;
            padding: ${props => props.theme.space[2]}px
              ${props => props.theme.space[3]}px;
            min-width: ${props => props.theme.sizes[6]}px;
          `}
          onPress={() => auth.login(true)}
        >
          <Text
            css={`
              color: ${props => props.theme.colors.white};
              font-family: nunito-bold;
              font-size: ${props => props.theme.fontSizes[3]}px;
              font-weight: 700;
            `}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Unauthenticated;
