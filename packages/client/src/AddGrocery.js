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
        borderRadius={3}
        p={2}
        m={2}
        bg="gray.300"
      >
        <GroceryInput
          onFocus={onFocus}
          accessibilityLabel="Add a new item to your grocers list."
          fontSize="display"
          color="black"
          onChangeText={setGroceryName}
          value={groceryName}
          onSubmitEditing={saveGrocery}
          css={`
            flex: 1;
          `}
        />
        <AddButton
          bg="transparent"
          accessibilityLabel="Add to your grocery list"
          onPress={saveGrocery}
          px="2"
        >
          <Ionicons name="md-send" size={32} color={colors.orange['500']} />
        </AddButton>
      </AddContainer>
    </KeyboardAvoidingView>
  );
};
