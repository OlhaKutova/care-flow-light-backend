import { gql } from 'graphql-tag';

const consultations = gql`
  enum ConsultStatus {
    NEW
    TRIAGED
    IN_PROGRESS
    RESOLVED
  }

  type Consultation {
    id: ID!
    status: ConsultStatus!
    summary: String!
    createdAt: String!
    clinic: Clinic!
    patient: Patient!
    notes: [Note!]!
  }

  extend type Query {
    consultations(
      clinicSlug: String
      status: ConsultStatus
      q: String
      skip: Int
      take: Int
    ): [Consultation!]!

    consultation(id: ID!): Consultation
  }

  extend type Mutation {
    createConsultation(
      patientId: ID!
      clinicSlug: String!
      summary: String!
    ): Consultation!

    updateConsultationStatus(
      id: ID!
      status: ConsultStatus!
    ): Consultation!

    deleteConsultation(id: ID!): Boolean!
  }
`;

export default consultations;
