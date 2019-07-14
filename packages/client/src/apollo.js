import { concat } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { API_BASE_URL } from 'react-native-dotenv';

/*
 Offline support recipe: https://medium.com/twostoryrobot/a-recipe-for-offline-support-in-react-apollo-571ad7e6f7f4
*/

const BASE_URL = API_BASE_URL || 'http://localhost:8080';

const makeApolloClient = token => {
  // create an apollo link instance, a network interface for apollo client
  const retry = new RetryLink({ attempts: { max: Infinity } });
  const http = new HttpLink({
    uri: `${BASE_URL}/v1/graphql`,
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
  });
  const link = concat(retry, http);

  // create an inmemory cache instance for caching graphql data
  const cache = new InMemoryCache();
  // instantiate apollo client with apollo link instance and cache instance
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};
export default makeApolloClient;
