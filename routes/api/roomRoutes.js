import express from 'express';
const router = express.Router();
import { User, Room, Message/*, RoomUser */} from '../../models/index.js';

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
  try {
    const newRoom = await Room.create({ name, password, admin_id: adminId });
    if (!newRoom) res.status(400).json({ message: 'Unable to create room.' });
    const updateChatters = await newRoom.addChatter(adminId);
    if (!updateChatters || updateChatters.length === 0) res.status(400).json({ message: 'Cannot add user to room.' });
    res.status(201).json(newRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;