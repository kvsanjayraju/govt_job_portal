import { Router } from 'express';
import { getJobs, getJobById, createJob, updateJob, deleteJob } from './jobs.controller';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJobById);
router.post('/', createJob); // Protected in real app
router.put('/:id', updateJob); // Protected
router.delete('/:id', deleteJob); // Protected

export default router;
