import { concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import { CachePersistor } from 'apollo-cache-persist';
import { API_BASE_URL_ENV, SCHEMA_VERSION_ENV } from 'react-native-dotenv';

const SCHEMA_VERSION = SCHEMA_VERSION_ENV || 'initial'; // Must be a string.
const SCHEMA_VERSION_KEY = 'apollo-schema-version';

/*
 Offline support recipe: https://medium.com/twostoryrobot/a-recipe-for-offline-support-in-react-apollo-571ad7e6f7f4
*/

const API_BASE_URL = API_BASE_URL_ENV || 'http://localhost:8080';

const makeApolloClient = async token => {
  // create an apollo link instance, a network interface for apollo client
  // const retry = new RetryLink({ attempts: { max: Infinity } });
  const retry = new RetryLink({
    attempts: (count, operation, error) => {
      // retry everything except initial list query, which errors and fallbacks to reading from cache
      return !!error && operation.operationName != 'QUERY_ITEMS';
      // retry query three times, when error (which falls back to reading from cache..)
      // return !!error && (operation.operationName != 'QUERY_ITEMS' || count < 3);
    },
  });

  let headers;
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  const http = new HttpLink({
    uri: `${API_BASE_URL}/v1/graphql`,
    headers,
  });
  const link = concat(retry, http);

  // create an inmemory cache instance for caching graphql data, and keep it persisted
  const cache = new InMemoryCache();
  const storage = AsyncStorage;

  const persistor = new CachePersistor({
    cache,
    storage,
  });
  // Read the current schema version from AsyncStorage.
  const currentVersion = await AsyncStorage.getItem(SCHEMA_VERSION_KEY);

  if (currentVersion === SCHEMA_VERSION) {
    // If the current version matches the latest version,
    // we're good to go and can restore the cache.
    await persistor.restore();
  } else {
    // Otherwise, we'll want to purge the outdated persisted cache
    // and mark ourselves as having updated to the latest version.
    await persistor.purge();
    await AsyncStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
  }

  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};

export default makeApolloClient;
