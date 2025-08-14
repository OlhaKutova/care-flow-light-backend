import { gql } from 'graphql-tag';

const auth = gql`
  type AuthPayload {
    token: String!
    email: String!
  }

  extend type Query {
    viewer: String
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthPayload!
  }
`;

export default auth;