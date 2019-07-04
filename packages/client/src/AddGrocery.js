import React, { useState } from 'react';
import { TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { color, typography, space } from 'styled-system';

import styled from './styled';

const GroceryInput = styled(TextInput)`
  ${color};
  ${typography};
  ${space};
`;

const AddButton = styled(Button)`
  ${color};
  ${typography};
  ${space};
`;

export default ({ addGrocery }) => {
  const [groceryName, setGroceryName] = useState('');
  const saveGrocery = () => {
    addGrocery(groceryName);
    setGroceryName('');
  };
  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <GroceryInput
        p={2}
        my={2}
        bg="lightgray"
        fontSize="display"
        color="black"
        onChangeText={setGroceryName}
        value={groceryName}
      />
      <AddButton
        p={2}
        my={2}
        bg="background"
        fontSize="7"
        color="text"
        onPress={saveGrocery}
        title="Add"
        accessibilityLabel="Add to your grocery list"
      />
    </KeyboardAvoidingView>
  );
};
