import { gql } from 'graphql-tag';

const typeDefs = gql`
    type Clinic { id: ID!, name: String!, slug: String!, consultations: [Consultation!]! }
    type Patient { id: ID!, name: String!, email: String!, createdAt: String!, consultations: [Consultation!]! }
    type Consultation {
        id: ID!, status: String!, summary: String!, createdAt: String!,
        clinic: Clinic!, patient: Patient!, notes: [Note!]!
    }
    type Note { id: ID!, body: String!, createdAt: String!, consultation: Consultation! }

    type Query {
        _ping: String!
        clinics: [Clinic!]!
        consultations(clinicSlug: String, status: String, q: String, skip: Int, take: Int): [Consultation!]!
        consultation(id: ID!): Consultation
    }

    type Mutation {
        createClinic(name: String!, slug: String!): Clinic!
        createPatient(name: String!, email: String!): Patient!
        createConsultation(patientId: ID!, clinicSlug: String!, summary: String!): Consultation!
        updateConsultationStatus(id: ID!, status: String!): Consultation!
        addNote(consultationId: ID!, body: String!): Note!
        deleteConsultation(id: ID!): Boolean!
    }
`;
export default typeDefs;
