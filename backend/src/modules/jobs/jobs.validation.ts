import { z } from 'zod';

export const CreateJobSchema = z.object({
  title: z.string().min(3),
  organization: z.string().min(2),
  examTrack: z.enum(['SSC', 'Banking', 'Railways', 'State', 'Defence', 'PSU', 'Teaching', 'UPSC']), // Expanded from frontend options
  mode: z.enum(['Online', 'Offline']),
  qualification: z.string().optional(),
  lastDate: z.string().optional().nullable(),
  tags: z.string().optional(),
  description: z.string().optional(),
  vacancies: z.string().optional(),
  eligibility: z.string().optional(),
  applicationProcess: z.string().optional(),
  fees: z.string().optional(),
  officialPdfUrl: z.string().url().optional().nullable(),
  applyLink: z.string().url().optional().nullable(),
  importantDates: z.any().optional(), // In a real app, validate JSON structure
  timeline: z.any().optional()
});

export const UpdateJobSchema = CreateJobSchema.partial();
