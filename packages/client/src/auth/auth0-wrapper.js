import { useState, useEffect } from 'react';
import auth0 from 'auth0-js';

// auth0 data
const auth0ClientId = '7HHRrraCDNzKhL0FoKIzJN4N066UKqWB';
const auth0Domain = 'kriswep.eu.auth0.com';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname,
  );
};

class Auth {
  auth0 = new auth0.WebAuth({
    domain: auth0Domain,
    clientID: auth0ClientId,
    redirectUri: window.location.origin,
    // responseType: 'token id_token',
    responseType: 'token id_token',
    scope: 'openid profile',
  });
  constructor(onStatusChanged = () => {}) {
    this.onStatusChanged = onStatusChanged;
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = null;
    this.sub = null;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);

    if (window.location.hash.includes('id_token=')) {
      // const { appState } = await auth0FromHook.handleRedirectCallback();
      this.handleAuthentication();
      onRedirectCallback();
    }
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // store in db
        this.auth0.client.userInfo(authResult.accessToken, function(err, user) {
          // Now you have the user's information
          // The code to insert this user info to db has been handled at Auth0 Rule.
        });
      } else if (err) {
        // history.replace("/home");
        // window.location.href="/home";
        console.error(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  };

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.sub = authResult.idTokenPayload.sub;

    this.onStatusChanged();

    // navigate to the home route
    // history.replace("/home");
    // window.location.href="/home";
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  getSub() {
    return this.sub;
  }

  renewSession() {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          _this.setSession(authResult);
          resolve(authResult);
        } else if (err) {
          _this.logout();
          reject(err);
        }
      });
    });
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.onStatusChanged();

    // navigate to the home route
    // history.replace("/");
    // window.location.href="/home";
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [changed, setChanged] = useState(new Date().getTime());

  const sessionChanged = () => {
    setChanged(new Date().getTime());
  };
  const [auth] = useState(new Auth(sessionChanged));

  useEffect(() => {
    const authenticated = auth.isAuthenticated();
    if (isAuthenticated !== authenticated) {
      setIsAuthenticated(authenticated);
    }
  }, [changed]);
  // debugger;
  return [auth, isAuthenticated];
};
