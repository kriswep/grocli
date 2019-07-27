import React, { useRef } from 'react';
import { FlatList, View, Text, Platform } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import GroceryItem from './GroceryItem';
import AddGrocery from './AddGrocery';
import { QUERY_ITEMS } from './items.query';

const ListSeparator = () => {
  return (
    <View
      height="fine"
      bg="gray.700"
      ml="3"
      css={`
        height: ${props => props.theme.sizes.fine}px;
        background-color: ${props => props.theme.colors.gray[700]};
        margin-left: ${props => props.theme.space[3]}px;
      `}
    />
  );
};

// see: https://medium.com/appandflow/react-native-collapsible-navbar-e51a049b560a

const absolutePostion = Platform.select({ web: 'fixed', default: 'absolute' });
const ListHeader = () => {
  return (
    <Text
      accessibilityRole="header"
      aria-level="2"
      css={`
        position: ${absolutePostion};
        top: 0;
        right: 0;
        left: 0;
        height: ${props => props.theme.space[5]}px;
        color: ${props => props.theme.colors.text};
        background-color: ${props => props.theme.colors.gray[800]};
        padding: ${props => props.theme.space[3]}px;
        font-family: nunito-bold;
        font-size: ${props => props.theme.fontSizes[4]}px;
        font-weight: 700;
      `}
    >
      Grocli
    </Text>
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
    return null;
  }

  return (
    <View
      css={`
        flex: 1;
      `}
    >
      {items && items.length > 0 && (
        <FlatList
          ref={groceryList}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GroceryItem grocery={item} />}
          ItemSeparatorComponent={ListSeparator}
          // ListHeaderComponent={ListHeader}
          css={`
            margin-top: ${props => props.theme.space[5]}px;
          `}
        />
      )}
      <AddGrocery groceryAdded={groceryAdded} onFocus={scrollToListEnd} />
      <ListHeader />
    </View>
  );
};
