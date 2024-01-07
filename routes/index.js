import express from 'express';
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

const router = express.Router();

router.use(htmlRoutes);
router.use('/api', apiRoutes);

export default router;
