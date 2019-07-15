import gql from 'graphql-tag';

export const QUERY_ITEMS = gql`
  query QUERY_ITEMS {
    items(order_by: { created_at: asc_nulls_first }) {
      id
      name
      done
    }
  }
`;
