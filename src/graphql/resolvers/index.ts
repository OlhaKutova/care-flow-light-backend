  import ping from './ping.js';
  import clinics from './clinics.js';
  import consultations from './consultations.js';
  import patients from './patients.js';
  import notes from './notes.js';
  import auth from './auth.js';

  const resolvers = {
    Query: {
      ...ping.Query,
      ...clinics.Query,
      ...consultations.Query,
      ...patients.Query,
      ...auth.Query,
    },
    Mutation: {
      ...clinics.Mutation,
      ...consultations.Mutation,
      ...patients.Mutation,
      ...notes.Mutation,
      ...auth.Mutation,
    },
    Consultation: consultations.Consultation,
    Note: notes.Note,
  };

  export default resolvers;
