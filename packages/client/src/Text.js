import React from 'react';
import { Text } from 'react-native';

export default props => {
  return (
    <Text
      accessibilityRole="text"
      css={`
        color: ${props => props.theme.colors.text};
        font-family: nunito;
        font-size: ${props => props.theme.fontSizes[1]}px;
        font-weight: 400;
      `}
      {...props}
    >
      {props.children}
    </Text>
  );
};
