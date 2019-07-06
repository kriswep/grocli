import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { color, typography, space } from 'styled-system';

import styled from './styled';
import { itemStyle } from './theme';

const Item = styled(Text)`
  ${color};
  ${typography};
  ${space};
  ${itemStyle};
`;

export default ({ grocery, toggleGrocery }) => (
  <TouchableOpacity
    onPress={() => {
      toggleGrocery(grocery.id);
    }}
  >
    <Item
      color="text"
      fontSize="display"
      px="3"
      py="3"
      variant={grocery.done ? 'done' : ''}
    >
      {grocery.name}
    </Item>
  </TouchableOpacity>
);
