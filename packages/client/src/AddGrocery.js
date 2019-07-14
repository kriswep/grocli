import React, { useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { color, typography, space, flexbox, border } from 'styled-system';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import styled from './styled';
import { colors } from './theme';
import { QUERY_ITEMS } from './items.query';

const AddContainer = styled(View)`
  ${color};
  ${space};
  ${flexbox};
  ${border};
`;

const GroceryInput = styled(TextInput)`
  ${color};
  ${typography};
  ${space};
  ${flexbox};
  ${border};
`;

const AddButton = styled(TouchableOpacity)`
  ${color};
  ${typography};
  ${space};
`;

export const SAVE_ITEM = gql`
  mutation SAVE_ITEM($name: String!) {
    insert_items(objects: { name: $name }) {
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
      <AddContainer
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        bg="gray.300"
        m="2"
        mb="4"
        borderRadius="3"
      >
        <GroceryInput
          onFocus={onFocus}
          accessibilityLabel="Add a new item to your grocery list."
          fontSize="5"
          color="black"
          onChangeText={setGroceryName}
          value={groceryName}
          onSubmitEditing={addGrocery}
          borderRadius="3"
          p="2"
          css={`
            flex: 1;
          `}
        />
        <AddButton
          bg="transparent"
          accessibilityLabel="Add to your grocery list"
          onPress={addGrocery}
          p="2"
        >
          <Ionicons name="md-send" size={32} color={colors.orange['500']} />
        </AddButton>
      </AddContainer>
    </KeyboardAvoidingView>
  );
};
