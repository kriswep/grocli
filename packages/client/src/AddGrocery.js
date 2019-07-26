import React, { useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { colors } from './theme';
import { QUERY_ITEMS } from './items.query';

export const SAVE_ITEM = gql`
  mutation SAVE_ITEM($name: String!) {
    insert_items(
      objects: {
        name: $name
        user: {
          data: {}
          on_conflict: { constraint: user_pkey, update_columns: name }
        }
      }
    ) {
      returning {
        id
        name
        done
      }
    }
  }
`;

export default ({ groceryAdded, onFocus }) => {
  const [groceryName, setGroceryName] = useState('');

  const [saveGrocery, { error, data }] = useMutation(SAVE_ITEM, {
    variables: { name: groceryName },
    // refetchQueries: ['QUERY_ITEMS'],
    optimisticResponse: {
      insert_items: {
        __typename: 'items_mutation_response',
        returning: {
          id: new Date().getTime().toString(), // temp Id fine for now
          name: groceryName,
          done: false,
          __typename: 'items',
        },
      },
    },
    update: (proxy, { data: { insert_items } }) => {
      // Read the data from our cache for this query.
      let data;
      try {
        data = proxy.readQuery({ query: QUERY_ITEMS });
      } catch (e) {
        // this happens when cache is empty
        data = { items: [] };
      }
      // Write our data back to the cache with the new item in it
      proxy.writeQuery({
        query: QUERY_ITEMS,
        data: {
          ...data,
          items: [
            ...data.items,
            Array.isArray(insert_items.returning)
              ? insert_items.returning[0]
              : insert_items.returning,
          ],
        },
      });
    },
  });

  const addGrocery = () => {
    if (groceryName.length > 0) {
      saveGrocery();
      setGroceryName('');
      groceryAdded();
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <View
        css={`
          flex-direction: row;
          justify-content: center;
          align-items: center;
          background-color: ${props => props.theme.colors.gray[300]};
          margin: ${props => props.theme.space[2]}px;
          margin-bottom: ${props => props.theme.space[4]}px;
          border-radius: ${props => props.theme.radii[3]}px;
        `}
      >
        <TextInput
          onFocus={onFocus}
          accessibilityLabel="Add a new item to your grocery list."
          onChangeText={setGroceryName}
          value={groceryName}
          onSubmitEditing={addGrocery}
          css={`
            flex: 1;
            font-size: ${props => props.theme.fontSizes[5]}px;
            font-family: nunito;
            color: ${props => props.theme.colors.black};
            padding: ${props => props.theme.space[2]}px;
            border-radius: ${props => props.theme.radii[3]}px;
          `}
        />
        <TouchableOpacity
          accessibilityLabel="Add to your grocery list"
          onPress={addGrocery}
          css={`
            padding: ${props => props.theme.space[2]}px;
            background: transparent;
          `}
        >
          <Ionicons name="md-send" size={32} color={colors.orange['500']} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
