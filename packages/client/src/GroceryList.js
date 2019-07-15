import React, { useState, useRef, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { space, layout, color, typography } from 'styled-system';
// import uuid from 'uuid/v4';
import { useQuery } from '@apollo/react-hooks';

import styled from './styled';
import GroceryItem from './GroceryItem';
import AddGrocery from './AddGrocery';
import { QUERY_ITEMS } from './items.query';

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

export default () => {
  const { loading, data: { items } = { items: [] } } = useQuery(QUERY_ITEMS, {
    fetchPolicy: 'cache-and-network',
  });

  const groceryAdded = name => {
    scrollToListEnd();
  };

  const groceryList = useRef(null);

  const scrollToListEnd = () => {
    if (items && items.length > 0) {
      setTimeout(() => groceryList.current.scrollToEnd(), 400);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      css={`
        flex: 1;
      `}
    >
      {items && items.length > 0 && (
        <GroceryList
          ref={groceryList}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GroceryItem grocery={item} />}
          ItemSeparatorComponent={ListSeparator}
          ListHeaderComponent={ListHeader}
        />
      )}
      <AddGrocery groceryAdded={groceryAdded} onFocus={scrollToListEnd} />
    </View>
  );
};
