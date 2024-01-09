import express from 'express';
const router = express.Router();
import { User, Room, Message, RoomUser } from '../../models/index.js';

// create a room
/*
{
	"name": "some room",
	"password": "password",
	"adminId": "09adaba0-bbb2-4586-b1f2-64dcb3f9c38d"
}
*/
router.post('/', async (req, res) => {
  const { name, password, adminId } = req.body;
  console.log(adminId)
  try {
    const newRoom = await Room.create({ name, password, adminId: adminId });
    if (!newRoom) res.status(400).json({ message: 'Unable to create room.' });
    const updateRoom = await newRoom.addChatter(adminId);
    if (!updateRoom) res.status(400).json({ message: 'Cannot add user to room.' });
    res.status(201).json(newRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;