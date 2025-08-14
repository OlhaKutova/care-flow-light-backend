import { PrismaClient, Clinic, Patient, Consultation } from '@prisma/client';
import { faker as demoData } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Seeding database with demo data');

  const clinicCount: number = 3;
  const clinics: Clinic[] = [];

  for (let i = 0; i < clinicCount; i++) {
    const clinic: Clinic = await prisma.clinic.create({
      data: {
        name: `${demoData.company.name()} Clinic`,
        slug: demoData.helpers.slugify(demoData.company.name().toLowerCase()) + `-${i}`
      }
    });
    clinics.push(clinic);
  }

  const patientCount: number = 10;
  const patients: Patient[] = [];

  for (let i = 0; i < patientCount; i++) {
    const patient: Patient = await prisma.patient.create({
      data: {
        name: demoData.person.fullName(),
        email: demoData.internet.email(),
        createdAt: demoData.date.past()
      }
    });
    patients.push(patient);
  }

  const statuses: string[] = ['New', 'Triaged', 'In Progress', 'Resolved'];
  const consultationCount: number = 25;
  const consultations: Consultation[] = [];

  for (let i = 0; i < consultationCount; i++) {
    const consultation: Consultation = await prisma.consultation.create({
      data: {
        status: demoData.helpers.arrayElement(statuses),
        summary: demoData.lorem.sentence(),
        clinicId: demoData.helpers.arrayElement(clinics).id,
        patientId: demoData.helpers.arrayElement(patients).id,
        createdAt: demoData.date.recent({ days: 90 })
      }
    });
    consultations.push(consultation);
  }

  for (const consultation of consultations) {
    const noteCount: number = demoData.number.int({ min: 1, max: 3 });
    for (let i = 0; i < noteCount; i++) {
      await prisma.note.create({
        data: {
          body: demoData.lorem.sentences({ min: 1, max: 3 }),
          consultationId: consultation.id,
          createdAt: demoData.date.recent({ days: 30 })
        }
      });
    }
  }

  console.log(`Seeded ${clinics.length} clinics, ${patients.length} patients, ${consultations.length} consultations, and notes.`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
