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
    description: "Combined Graduate Level Examination, 2025",
    summaryShort: "The 'IAS' of non-UPSC jobs. Top administrative posts in central ministries.",
    whyThisJobMatters: "SSC CGL is the gateway to becoming an Inspector, Assistant Section Officer, or Divisional Accountant in top central ministries like MEA, CBI, Income Tax, and Customs. It offers stability, respect, and a clear path to high-ranking positions.",
    keyHighlights: "- **Post Group**: Group B & C (Gazetted/Non-Gazetted)\n- **Salary**: ₹45,000 to ₹80,000+ (depending on city)\n- **Departments**: MEA, Railways, Defense, CSS, Income Tax\n- **Work Life Balance**: Generally 9-5 with fixed holidays",
    eligibilityNotes: "**Age**: 18-32 years (varies by post)\n**Education**: Bachelor’s Degree from any recognized university. Final year students can apply if they get their degree before the cutoff date.",
    examPatternNotes: "**Tier-I**: Qualifying (Maths, Reasoning, English, GK)\n**Tier-II**: Merit-deciding (Maths+Reasoning, English+GK, Computer, Typing)\n**Note**: No interview for CGL posts anymore.",
    prepTips: "- Focus heavily on *Maths* and *English* for Tier-II.\n- Practice *Typing* early; many fail here despite high scores.\n- Current Affairs of last 6 months is crucial for GK.",
    sourceUrl: "https://ssc.nic.in"
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
    timeline: JSON.stringify([{ stage: "Notification", date: "2025-04-01", status: "Pending" }]),
    summaryShort: "Fastest route to becoming a bank manager in India's largest lender.",
    whyThisJobMatters: "SBI PO is considered the most premium banking job in India. You start as a Probationary Officer but can rise to the level of Chairman. The perks, allowances, and social status are unmatched in the banking sector.",
    keyHighlights: "- **Starting CTC**: ₹12-14 Lakhs per annum\n- **Post**: Assistant Manager (Probationary Officer)\n- **Perks**: Leased accommodation, petrol, medical, furniture allowance",
    eligibilityNotes: "**Age**: 21-30 years\n**Education**: Graduation in any discipline.",
    examPatternNotes: "**Prelims**: Speed test (English, Quant, Reasoning)\n**Mains**: Concept test + Descriptive English\n**Interview/GD**: Final selection stage",
    prepTips: "- Speed is king in Prelims. Practice 1-hour mocks daily.\n- For Mains, focus on *Data Interpretation* and *General Awareness* (Banking awareness).\n- Start reading newspapers for the Descriptive section."
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
    timeline: JSON.stringify([{ stage: "Exam", date: "2025-02-15", status: "Upcoming" }]),
    summaryShort: "Massive recruitment drive for uniform services in UP.",
    whyThisJobMatters: "A great opportunity for 12th pass candidates to serve in the police force with job security and government benefits.",
    keyHighlights: "- **Vacancies**: 60,000+ (Huge opportunity)\n- **Exam Mode**: Offline (OMR based)\n- **Physical Test**: Running is crucial part of selection",
    eligibilityNotes: "**Age**: 18-25 (Male), 18-28 (Female) (Relaxations apply)\n**Education**: 12th Pass (Intermediate)",
    examPatternNotes: "**Written**: GK, Hindi, Numerical Ability, Mental Aptitude\n**Physical**: Race (4.8km for males, 2.4km for females)",
    prepTips: "- Hindi Grammar is a scoring subject.\n- Practice OMR filling to avoid errors.\n- Start physical training (running) immediately."
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
    timeline: JSON.stringify([{ stage: "Notification", date: "2025-03-01", status: "Pending" }]),
    summaryShort: "Non-Technical Popular Categories - Station Master, Goods Guard, Clerk.",
    whyThisJobMatters: "Railways is the largest employer. NTPC offers diverse roles from operational (Station Master) to office clerical jobs.",
    keyHighlights: "- **Posts**: Station Master, Goods Guard, Ticket Clerk, Typist\n- **Benefits**: Free train travel pass, railway quarters, medical",
    eligibilityNotes: "**12th Level Posts**: Junior Clerk, Accounts Clerk\n**Graduate Level Posts**: Station Master, Goods Guard",
    examPatternNotes: "**CBT-1**: Screening\n**CBT-2**: Merit based\n**Typing/Aptitude**: Based on post chosen",
    prepTips: "- Previous Year Questions (PYQs) are very important.\n- Science and GK have high weightage."
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const job of jobs) {
    const existing = await prisma.job.findFirst({
        where: { title: job.title }
    });

    if (existing) {
        await prisma.job.update({
            where: { id: existing.id },
            data: job
        });
        console.log(`Updated job with id: ${existing.id}`);
    } else {
        const createdJob = await prisma.job.create({
            data: job,
        });
        console.log(`Created job with id: ${createdJob.id}`);
    }
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
