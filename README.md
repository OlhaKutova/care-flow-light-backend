# CareFlow Lite Backend

CareFlow Lite is a demo telehealth-style application demonstrating a complete end-to-end workflow for managing patient consultations across multiple clinics.  
The application showcases secure mock authentication, GraphQL queries and mutations, and a responsive, modern interface built with a full-stack TypeScript setup.  
The primary objective is to provide a realistic example of a clinician-facing system that enables viewing and filtering consultations, creating new consultations, updating statuses, and recording notes — with emphasis on polished, intuitive frontend interactions.

This backend service is built with Node.js and TypeScript, providing a secure mock authentication flow, a GraphQL API for managing consultations, and Prisma ORM integration with Neon PostgreSQL.

---

## Features
- **Secure Mock Login**: Server-validated login using environment variables and bcrypt password hashing.
- **GraphQL API**: Queries and mutations for consultations, patients, clinics, and notes.
- **CRUD Operations**: Create, update, delete consultations; update status; add notes.
- **Filtering & Pagination**: Filter consultations by clinic, status, and search text with paginated results.
- **Prisma ORM**: Type-safe database access with Neon PostgreSQL.
- **Production Deployment**: Configured for Render hosting.

---

## Tech Stack
**Backend**
- Node.js
- TypeScript
- Express
- Apollo Server (GraphQL)
- Prisma ORM
- Neon PostgreSQL
- JWT for auth
- Bcrypt for password hashing
- CORS configured for frontend origin

---

## Environment Variables
Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://<username>:<password>@<neon-host>/<dbname>?sslmode=require"
PORT=4000
DEMO_EMAIL=demo.patient@example.com
DEMO_PASSWORD_HASH=<bcrypt-hash-of-demo1234>
JWT_SECRET=<secure-random-string>
DEMO_WRITE_KEY=<secure-random-string>
