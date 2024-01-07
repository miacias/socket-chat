import express from 'express';
import userRoutes from './userRoutes.js';
import roomRoutes from './roomRoutes.js'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);

export default router;
