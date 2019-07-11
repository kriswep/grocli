import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

/*
 Offline support recipe: https://medium.com/twostoryrobot/a-recipe-for-offline-support-in-react-apollo-571ad7e6f7f4
*/

const makeApolloClient = token => {
  // create an apollo link instance, a network interface for apollo client
  const link = new HttpLink({
    uri: `http://localhost:8080/v1/graphql`,
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
  });
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
