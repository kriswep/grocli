import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';

import Text from './Text';
import { useSizeState } from './Size';
import { useAuthState } from './auth/authWrapper';
import Side from './Side';

const Unauthenticated = () => {
  const [auth, isAuthenticated] = useAuthState();

  const [dimension] = useSizeState();

  if (isAuthenticated || auth.loading) return null;

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
          dim={dimension}
          css={`
            align-self: center;
            color: ${props => props.theme.colors.black};
            font-family: nunito-bold;
            font-size: ${props => props.theme.fontSizes[6]}px;
            font-weight: 700;
            ${({ dim, theme }) =>
              dim.m &&
              `
              font-size: ${theme.fontSizes[7]}px;
            `}
          `}
        >
          Grocli
        </Text>
      </View>
      <View
        css={`
          flex-direction: row;
          flex: 1;
        `}
      >
        <View
          css={`
            flex: 1;
            align-self: stretch;
            align-items: center;
            justify-content: center;
          `}
        >
          <Text
            dim={dimension}
            css={`
              text-align: center;
              color: ${props => props.theme.colors.white};
              font-size: ${props => props.theme.fontSizes[4]}px;
              padding: ${props => props.theme.space[5]}px
                ${props => props.theme.space[3]}px;
              ${({ dim, theme }) =>
                dim.m &&
                `
                font-size: ${theme.fontSizes[5]}px;
                padding: ${theme.space[6]}px ${theme.space[4]}px;
              `}
            `}
          >
            Manage your daily grocery shopping with ease.
          </Text>
          <TouchableOpacity
            accessibilityLabel="Log In"
            dim={dimension}
            css={`
              align-items: center;
              border-radius: ${props => props.theme.space[4]}px;
              background-color: ${props => props.theme.colors.white};
              margin-bottom: ${props => props.theme.space[4]}px;
              padding: ${props => props.theme.space[2]}px
                ${props => props.theme.space[3]}px;
              min-width: ${props => props.theme.sizes[6]}px;
              ${({ dim, theme }) =>
                dim.m &&
                `
                min-width: ${theme.sizes[7]}px;
                padding: ${theme.space[3]}px;
                margin-bottom: ${theme.space[5]}px;
              `}
            `}
            onPress={() => auth.login()}
          >
            <Text
              dim={dimension}
              css={`
                color: ${props => props.theme.colors.black};
                font-family: nunito-bold;
                font-size: ${props => props.theme.fontSizes[3]}px;
                font-weight: 700;
                ${({ dim, theme }) =>
                  dim.m &&
                  `
                  font-size: ${theme.fontSizes[4]}px;
                `}
              `}
            >
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Sign Up"
            dim={dimension}
            css={`
              align-items: center;
              border-radius: ${props => props.theme.space[4]}px;
              background-color: ${props => props.theme.colors.black};
              border: solid ${props => props.theme.colors.white}
                ${props => props.theme.sizes.fine}px;
              margin-bottom: ${props => props.theme.space[3]}px;
              padding: ${props => props.theme.space[2]}px
                ${props => props.theme.space[3]}px;
              min-width: ${props => props.theme.sizes[6]}px;
              ${({ dim, theme }) =>
                dim.m &&
                `
                min-width: ${theme.sizes[7]}px;
                padding: ${theme.space[3]}px;
              `}
            `}
            onPress={() => auth.login(true)}
          >
            <Text
              dim={dimension}
              css={`
                color: ${props => props.theme.colors.white};
                font-family: nunito;
                font-size: ${props => props.theme.fontSizes[3]}px;
                font-weight: 400;
                ${({ dim, theme }) =>
                  dim.m &&
                  `
                  font-size: ${theme.fontSizes[4]}px;
                `}
              `}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {dimension.l && (
          <View
            dim={dimension}
            css={`
              flex: 1;
              ${({ dim }) =>
                dim.xl &&
                `
                flex: 1;
              `};
            `}
          >
            <Side />
          </View>
        )}
      </View>
    </>
  );
};

export default Unauthenticated;
