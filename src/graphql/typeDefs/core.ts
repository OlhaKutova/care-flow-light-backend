import { gql } from 'graphql-tag';

const core = gql`
  type Query {
    _ping: String!
  }

  type Mutation {
    _empty: String
  }
`;

export default core;
