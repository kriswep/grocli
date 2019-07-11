import React, { useState, useRef } from 'react';
import { FlatList, View, Text } from 'react-native';
import { space, layout, color, typography } from 'styled-system';
import uuid from 'uuid/v4';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import styled from './styled';
import GroceryItem from './GroceryItem';
import AddGrocery from './AddGrocery';

const GroceryList = styled(FlatList)`
  ${space};
`;

const Separator = styled(View)`
  ${space};
  ${color};
  ${layout};
`;

const ListSeparator = () => {
  return <Separator height="fine" bg="gray.700" ml="3" />;
};

const Header = styled(Text)`
  ${space};
  ${color};
  ${layout};
  ${typography};
`;

const ListHeader = () => {
  return (
    <Header
      color="text"
      bg="gray.800"
      accessibilityRole="header"
      aria-level="2"
      fontSize="display"
      p="3"
    >
      Grocery List
    </Header>
  );
};

const initialGroceries = [
  { id: uuid(), name: 'Banana' },
  { id: uuid(), name: 'Oranges', done: true },
  { id: uuid(), name: 'Milk' },
  { id: uuid(), name: 'Bread' },
  { id: uuid(), name: 'Banana' },
  { id: uuid(), name: 'Oranges', done: true },
  { id: uuid(), name: 'Milk' },
  { id: uuid(), name: 'Bread' },
  { id: uuid(), name: 'Banana' },
  { id: uuid(), name: 'Oranges', done: true },
  { id: uuid(), name: 'Milk' },
  { id: uuid(), name: 'Bread' },
  { id: uuid(), name: 'Banana' },
  { id: uuid(), name: 'Oranges', done: true },
  { id: uuid(), name: 'Milk' },
  { id: uuid(), name: 'Bread' },
];

export const USERS_ITEMS = gql`
  query {
    users {
      id
      items(limit: 10) {
        name
      }
    }
    items {
      id
      name
      done
      user {
        id
      }
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(USERS_ITEMS);

  console.log(loading, data);

  const [groceries, setGroceries] = useState(initialGroceries);

  const addGrocery = name => {
    setGroceries(groceries.concat({ id: uuid(), name }));
    scrollToListEnd();
  };

  const toggleGrocery = id => {
    setGroceries(
      groceries.map(grocery =>
        grocery.id === id ? { ...grocery, done: !grocery.done } : grocery,
      ),
    );
  };

  const groceryList = useRef(null);

  const scrollToListEnd = () => {
    setTimeout(() => groceryList.current.scrollToEnd(), 400);
  };

  return (
    <View
      css={`
        flex: 1;
      `}
    >
      <GroceryList
        ref={groceryList}
        data={groceries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GroceryItem grocery={item} toggleGrocery={toggleGrocery} />
        )}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListHeader}
      />
      <AddGrocery addGrocery={addGrocery} onFocus={scrollToListEnd} />
    </View>
  );
};
