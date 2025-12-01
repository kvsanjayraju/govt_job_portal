import { Router } from 'express';
// Placeholder for admin routes
const router = Router();

router.get('/', (req, res) => {
    res.json({ message: "Admin route works" });
});

router.post('/verify', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Fallback for dev

    if (password === adminPassword) {
        res.json({ ok: true });
    } else {
        res.status(401).json({ ok: false, message: 'Invalid password' });
    }
});

export default router;
