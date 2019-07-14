import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { color, typography, space } from 'styled-system';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import styled from './styled';
import { itemStyle } from './theme';
import { QUERY_ITEMS } from './items.query';

const Item = styled(Text)`
  ${color};
  ${typography};
  ${space};
  ${itemStyle};
`;

export const TOGGLE_ITEM = gql`
  mutation TOGGLE_ITEM($id: uuid!, $done: Boolean!) {
    update_items(where: { id: { _eq: $id } }, _set: { done: $done }) {
      returning {
        done
        id
        name
      }
    }
  }
`;

export default ({ grocery }) => {
  const [toggleGrocery, { error, data }] = useMutation(TOGGLE_ITEM, {
    variables: { id: grocery.id, done: !grocery.done },
    // refetchQueries: ['QUERY_ITEMS'],
    optimisticResponse: {
      update_items: {
        __typename: 'items_mutation_response',
        returning: {
          id: grocery.id,
          name: grocery.name,
          done: !grocery.done,
          __typename: 'items',
        },
      },
    },
    update: (proxy, { data: { update_items } }) => {
      // Read the data from our cache for this query.
      let data;
      try {
        data = proxy.readQuery({ query: QUERY_ITEMS });
      } catch (e) {
        // this happens when cache is empty
        data = { items: [] };
      }
      // Write our data back to the cache with the changed comment in it, //TODO
      proxy.writeQuery({
        query: QUERY_ITEMS,
        data: {
          ...data,
          items: data.items.map(item =>
            item.id === grocery.id ? { ...item, done: !grocery.done } : item,
          ),
        },
      });
    },
  });

  return (
    <TouchableOpacity onPress={toggleGrocery}>
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
};
