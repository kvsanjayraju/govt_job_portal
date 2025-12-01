import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const jobs = [
  {
    title: "SSC CGL 2025",
    organization: "Staff Selection Commission",
    examTrack: "SSC",
    mode: "Online",
    tags: "Graduate, Group B",
    qualification: "Bachelor Degree",
    location: "Pan India",
    state: "Central",
    vacancies: "7500",
    importantDates: JSON.stringify([{ title: "Notification", date: "2025-01-01" }, { title: "Exam", date: "2025-06-01" }]),
    timeline: JSON.stringify([{ stage: "Notification", date: "2025-01-01", status: "Done" }]),
    description: "Combined Graduate Level Examination, 2025"
  },
  {
    title: "SBI PO 2025",
    organization: "State Bank of India",
    examTrack: "Banking",
    mode: "Online",
    tags: "PO, Manager",
    qualification: "Graduate",
    location: "Pan India",
    state: "Central",
    vacancies: "2000",
    importantDates: JSON.stringify([{ title: "Notification", date: "2025-04-01" }]),
    timeline: JSON.stringify([{ stage: "Notification", date: "2025-04-01", status: "Pending" }])
  },
  {
    title: "UP Police Constable",
    organization: "UPPRPB",
    examTrack: "State",
    mode: "Offline",
    tags: "Police, Constable, 12th Pass",
    qualification: "12th Pass",
    location: "Uttar Pradesh",
    state: "Uttar Pradesh",
    vacancies: "60244",
    importantDates: JSON.stringify([{ title: "Exam", date: "2025-02-15" }]),
    timeline: JSON.stringify([{ stage: "Exam", date: "2025-02-15", status: "Upcoming" }])
  },
  {
    title: "RRB NTPC 2025",
    organization: "Railway Recruitment Board",
    examTrack: "Railways",
    mode: "Online",
    tags: "NTPC, Graduate, 12th Pass",
    qualification: "12th Pass / Graduate",
    location: "Pan India",
    state: "Central",
    vacancies: "35000",
    importantDates: JSON.stringify([{ title: "Notification", date: "2025-03-01" }]),
    timeline: JSON.stringify([{ stage: "Notification", date: "2025-03-01", status: "Pending" }])
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const job of jobs) {
    const createdJob = await prisma.job.create({
      data: job,
    });
    console.log(`Created job with id: ${createdJob.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
