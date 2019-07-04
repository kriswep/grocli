import React from 'react';
import { FlatList } from 'react-native';
import { space } from 'styled-system';

import styled from './styled';

const GroceryList = styled(FlatList)`
  ${space};
`;

import GroceryItem from './GroceryItem';

const groceries = [
  { id: '1', name: 'Banana' },
  { id: '2', name: 'Orange' },
  { id: '3', name: 'Milk' },
  { id: '4', name: 'Bread' },
];

export default () => (
  <GroceryList
    py={4}
    data={groceries}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <GroceryItem grocery={item} />}
  />
);
