import { gql } from 'graphql-tag';

const clinics = gql`
  type Clinic {
    id: ID!
    name: String!
    slug: String!
    consultations: [Consultation!]!
  }

  extend type Query {
    clinics: [Clinic!]!
  }

  extend type Mutation {
    createClinic(name: String!, slug: String!): Clinic!
  }
`;

export default clinics;
