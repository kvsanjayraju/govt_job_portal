import { Router } from 'express';
// Placeholder for admin routes
const router = Router();

router.get('/', (req, res) => {
    res.json({ message: "Admin route works" });
});

export default router;
