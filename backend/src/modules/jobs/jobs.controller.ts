import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../app';

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, state, track, qualification, page = 1, pageSize = 10 } = req.query;

    const where: any = {
      isArchived: false
    };

    if (q) {
      where.OR = [
        // 'mode: insensitive' is supported by Postgres. SQLite default collation is usually case-insensitive for ASCII.
        // For production Postgres, uncomment 'mode: "insensitive"'.
        { title: { contains: String(q) /*, mode: 'insensitive' */ } },
        { organization: { contains: String(q) /*, mode: 'insensitive' */ } }
      ];
    }

    if (state) where.state = String(state);
    if (track) where.examTrack = String(track);
    if (qualification) where.qualification = { contains: String(qualification) };

    const skip = (Number(page) - 1) * Number(pageSize);
    const take = Number(pageSize);

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.job.count({ where })
    ]);

    // Parse JSON strings back to objects
    const parsedJobs = jobs.map(job => ({
      ...job,
      importantDates: job.importantDates ? JSON.parse(job.importantDates as string) : [],
      timeline: job.timeline ? JSON.parse(job.timeline as string) : []
    }));

    res.json({
      data: parsedJobs,
      meta: {
        total,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPages: Math.ceil(total / Number(pageSize))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
        return;
    }

    const parsedJob = {
      ...job,
      importantDates: job.importantDates ? JSON.parse(job.importantDates as string) : [],
      timeline: job.timeline ? JSON.parse(job.timeline as string) : []
    };

    res.json(parsedJob);
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    // Basic validation could go here or middleware
    // Serialize JSON fields
    if (data.importantDates) data.importantDates = JSON.stringify(data.importantDates);
    if (data.timeline) data.timeline = JSON.stringify(data.timeline);

    const job = await prisma.job.create({ data });
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.importantDates) data.importantDates = JSON.stringify(data.importantDates);
    if (data.timeline) data.timeline = JSON.stringify(data.timeline);

    const job = await prisma.job.update({
      where: { id },
      data
    });
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.job.update({
      where: { id },
      data: { isArchived: true }
    });
    res.json({ message: 'Job archived' });
  } catch (error) {
    next(error);
  }
};
