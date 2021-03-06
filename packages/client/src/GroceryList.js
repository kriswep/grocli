import React, { useRef } from 'react';
import { FlatList, View, Animated, Platform } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import GroceryItem from './GroceryItem';
import AddGrocery from './AddGrocery';
import { QUERY_ITEMS } from './items.query';
import useHeaderAnimation from './AnimatedHeader';
import theme from './theme';

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

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
      setTimeout(() => groceryList.current.getNode().scrollToEnd(), 400);
    }
  };

  const {
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    onScroll,
    AnimatedListHeader,
  } = useHeaderAnimation();

  if (loading) {
    return null;
  }

  return (
    <View
      css={`
        flex: 1;
      `}
    >
      <AnimatedListHeader />
      {items && items.length > 0 && (
        <AnimatedFlatList
          ref={groceryList}
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <GroceryItem grocery={item} />}
          ItemSeparatorComponent={ListSeparator}
          bounces="false"
          scrollEventThrottle={16}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          onScroll={onScroll}
          css={`
            flex-basis: ${props => props.theme.space[7]}px;
            flex-grow: 1;
            padding-top: ${props => props.theme.space[5]}px;
          `}
          contentContainerStyle={Platform.select({
            web: {},
            default: { paddingBottom: theme.space[5] },
          })}
        />
      )}
      {!items ||
        (items.length < 1 && (
          <View
            css={`
              padding-top: ${props => props.theme.space[5]}px;
              flex-grow: 1;
            `}
          />
        ))}
      <AddGrocery groceryAdded={groceryAdded} onFocus={scrollToListEnd} />
    </View>
  );
};
