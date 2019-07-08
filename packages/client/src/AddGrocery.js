import React, { useState } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { color, typography, space, flexbox, border } from 'styled-system';
import { Ionicons } from '@expo/vector-icons';

import styled from './styled';
import { colors } from './theme';

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

export default ({ addGrocery, onFocus }) => {
  const [groceryName, setGroceryName] = useState('');
  const saveGrocery = () => {
    if (groceryName.length > 0) {
      addGrocery(groceryName);
      setGroceryName('');
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
          onSubmitEditing={saveGrocery}
          borderRadius="3"
          p="2"
          css={`
            flex: 1;
          `}
        />
        <AddButton
          bg="transparent"
          accessibilityLabel="Add to your grocery list"
          onPress={saveGrocery}
          p="2"
        >
          <Ionicons name="md-send" size={32} color={colors.orange['500']} />
        </AddButton>
      </AddContainer>
    </KeyboardAvoidingView>
  );
};
