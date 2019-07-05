import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { space } from 'styled-system';
import uuid from 'uuid/v4';

import styled from './styled';
import GroceryItem from './GroceryItem';
import AddGrocery from './AddGrocery';

const GroceryList = styled(FlatList)`
  ${space};
`;

const initialGroceries = [
  { id: uuid(), name: 'Banana' },
  { id: uuid(), name: 'Oranges', done: true },
  { id: uuid(), name: 'Milk' },
  { id: uuid(), name: 'Bread' },
];

export default () => {
  const [groceries, setGroceries] = useState(initialGroceries);

  const addGrocery = name => {
    setGroceries(groceries.concat({ id: uuid(), name }));
  };

  const toggleGrocery = id => {
    setGroceries(
      groceries.map(grocery =>
        grocery.id === id ? { ...grocery, done: !grocery.done } : grocery,
      ),
    );
  };

  return (
    <View
      css={`
        flex: 1;
      `}
    >
      <GroceryList
        py={4}
        data={groceries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GroceryItem grocery={item} toggleGrocery={toggleGrocery} />
        )}
      />
      <AddGrocery addGrocery={addGrocery} />
    </View>
  );
};
