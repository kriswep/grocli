import React from 'react';
import { Text } from 'react-native';
import { color, typography, space } from 'styled-system';

import styled from './styled';
import { itemStyle } from './theme';

const Item = styled(Text)`
  ${color};
  ${typography};
  ${space};
  ${itemStyle};
`;

export default ({ grocery }) => (
  <Item
    color="text"
    fontSize="display"
    px="3"
    variant={grocery.done ? 'done' : ''}
  >
    {grocery.name}
  </Item>
);
