import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import auth0js from 'auth0-js';
import jwtDecode from 'jwt-decode';

const AuthStateContext = React.createContext();

// auth0 data
const auth0ClientId = '7HHRrraCDNzKhL0FoKIzJN4N066UKqWB';
const auth0Domain = 'kriswep.eu.auth0.com';

/**
 * Routes the user to the right place after login
 */
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

//   renewSession() {
//     const _this = this;
//     return new Promise((resolve, reject) => {
//       _this.auth0.checkSession({}, (err, authResult) => {
//         if (authResult && authResult.accessToken && authResult.idToken) {
//           _this.setSession(authResult);
//           resolve(authResult);
//         } else if (err) {
//           _this.logout();
//           reject(err);
//         }
//       });
//     });
//   }

function AuthProvider({ children }) {
  const [auth0] = useState(
    new auth0js.WebAuth({
      domain: auth0Domain,
      clientID: auth0ClientId,
      redirectUri: window.location.origin,
      responseType: 'token id_token',
      scope: 'openid profile',
    }),
  );

  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState(null);
  const [name, setName] = useState(null);
  const [expiresAt, setExpiresAt] = useState(0);
  const [sub, setSub] = useState(null);

  useEffect(() => {
    if (window.location.hash.includes('id_token=')) {
      handleAuthenticationHash();
      onRedirectCallback();
    }
  }, [window.location.hash]);

  useEffect(() => {
    const getSessionFromToken = async () => {
      const token = await localStorage.getItem('token');
      handleAuthenticationToken(token);
    };
    getSessionFromToken();
  }, []);

  const login = signup => {
    setLoading(true);
    let login_hint;
    if (signup) {
      login_hint = 'signUp';
    }
    auth0.authorize({ login_hint });
  };

  const handleAuthenticationHash = () => {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
      } else if (err) {
        console.error(err);
        Alert('Authentication error', err.error || 'something went wrong');
      }
      setLoading(false);
    });
  };

  const handleAuthenticationToken = token => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        setSession({ idToken: token, idTokenPayload: decoded });
      }
    }
    setLoading(false);
  };

  const setSession = authResult => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', authResult.idToken);

    // Set the data from result
    setIdToken(authResult.idToken);
    setSub(authResult.idTokenPayload.sub);
    setName(authResult.idTokenPayload.name);
    setExpiresAt(authResult.idTokenPayload.exp * 1000);
  };

  const logout = () => {
    // Remove tokens and expiry time
    setIdToken(null);
    setSub(null);
    setName(null);
    setExpiresAt(0);

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  };

  const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    return new Date().getTime() < expiresAt;
  };

  const state = [
    {
      token: idToken,
      name,
      login,
      logout,
      isAuthenticated,
      loading,
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
