-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "location" TEXT,
    "state" TEXT,
    "examTrack" TEXT NOT NULL,
    "qualification" TEXT,
    "mode" TEXT NOT NULL,
    "lastDate" DATETIME,
    "tags" TEXT NOT NULL,
    "description" TEXT,
    "vacancies" TEXT,
    "eligibility" TEXT,
    "applicationProcess" TEXT,
    "fees" TEXT,
    "officialPdfUrl" TEXT,
    "applyLink" TEXT,
    "importantDates" TEXT,
    "timeline" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
