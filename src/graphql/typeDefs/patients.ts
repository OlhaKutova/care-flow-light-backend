import { gql } from 'graphql-tag';

const patients = gql`
  type Patient {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    consultations: [Consultation!]!
  }

  extend type Mutation {
    createPatient(name: String!, email: String!): Patient!
  }
`;

export default patients;
