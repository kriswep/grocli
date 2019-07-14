import gql from 'graphql-tag';

export const QUERY_ITEMS = gql`
  query QUERY_ITEMS {
    items {
      id
      name
      done
    }
  }
`;
