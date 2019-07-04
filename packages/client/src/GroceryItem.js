import React from 'react';
import { Text } from 'react-native';
import { color, typography, space } from 'styled-system';

import styled from './styled';

const Item = styled(Text)`
  ${color};
  ${typography};
  ${space};
`;

export default ({ grocery }) => (
  <Item color="text" fontSize="display" px="3">
    {grocery.name}
  </Item>
);
