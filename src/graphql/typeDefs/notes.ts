import { gql } from 'graphql-tag';

const notes = gql`
  type Note {
    id: ID!
    body: String!
    createdAt: String!
    consultation: Consultation!
  }

  extend type Mutation {
    addNote(consultationId: ID!, body: String!): Note!
  }
`;

export default notes;
