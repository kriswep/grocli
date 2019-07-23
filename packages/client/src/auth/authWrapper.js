import React, { useState } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import jwtDecode from 'jwt-decode';

const AuthStateContext = React.createContext();

// auth0 data
const auth0ClientId = '7HHRrraCDNzKhL0FoKIzJN4N066UKqWB';
const auth0Domain = 'https://kriswep.eu.auth0.com';

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')
  );
}

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [expiresAt, setExpiresAt] = useState(0);

  const login = async signup => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();

    let login_hint;
    if (signup) {
      login_hint = 'signUp';
    }
    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: 'id_token', // id_token will return a JWT token
      scope: 'openid profile', // retrieve the user's profile
      nonce: 'nonce', // ideally, this will be a random value
      login_hint,
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;

    // Perform the authentication
    const response = await AuthSession.startAsync({
      authUrl,
    });

    if (response.type === 'success') {
      handleResponse(response.params);
    }
    if (response.error) {
      Alert(
        'Authentication error',
        response.error_description || 'something went wrong',
      );
    }
  };

  const handleResponse = response => {
    if (response.error) {
      return;
    }

    // Set isLoggedIn flag in Storage
    AsyncStorage.setItem('isLoggedIn', 'true');

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);

    setToken(jwtToken);
    setName(decoded.name);
    setExpiresAt(decoded.exp * 1000);
  };

  const logout = () => {
    // Remove tokens and expiry time
    setToken(null);
    setName(null);
    setExpiresAt(0);

    // Remove isLoggedIn flag from Storage
    AsyncStorage.removeItem('isLoggedIn');
  };

  const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < expiresAt;
  };

  const state = [
    {
      token,
      name,
      login,
      logout,
      isAuthenticated,
    },
    isAuthenticated(),
  ];

  return (
    <AuthStateContext.Provider value={state}>
      {children}
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuthState };
