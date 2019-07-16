import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import { useAuth } from './auth0-wrapper';

const Session = () => {
  const [auth, isAuthenticated] = useAuth();

  console.log('auth?', auth.isAuthenticated(), isAuthenticated);
  return (
    <View style={styles.container}>
      {!isAuthenticated && (
        <Button title="Log in with Auth0 web" onPress={auth.login} />
      )}
      {isAuthenticated &&
        (console.log(auth.getIdToken()) || (
          <Button title="Log out" onPress={auth.logout} />
        ))}
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
