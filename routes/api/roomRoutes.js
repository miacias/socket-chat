import express from 'express';
const router = express.Router();
import { User, Room, Message } from '../../models/index.js';

router.post('/', async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    if (!newRoom) res.status(400).json({ message: 'Unable to create room.' });
    res.status(201).json(newRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;