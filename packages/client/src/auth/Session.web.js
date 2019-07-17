import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import useAuth from './auth-wrapper';

const Session = () => {
  const [auth, isAuthenticated] = useAuth();

  return (
    <View style={styles.container}>
      {!isAuthenticated && (
        <Button title="Log in with Auth0 web" onPress={auth.login} />
      )}
      {isAuthenticated &&
        auth.name &&
        (console.log(auth.token) || (
          <Text style={styles.title}>You are logged in, {auth.name}!</Text>
        ))}
      {isAuthenticated && <Button title="Log out" onPress={auth.logout} />}
    </View>
  );
};

export default Session;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});
