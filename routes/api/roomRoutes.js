import express from 'express';
const router = express.Router();
import { User, Room, Message/*, RoomUser */} from '../../models/index.js';
import { auth } from '../../utils/auth.js';

// create a room
/*
{
	"name": "some room",
	"password": "password",
	"adminId": "09adaba0-bbb2-4586-b1f2-64dcb3f9c38d"
}
*/
router.post('/', auth, async (req, res) => {
  const { name, password, adminId } = req.body;
  try {
    const newRoom = await Room.create({ name, password, admin_id: adminId });
    if (!newRoom) res.status(400).json({ message: 'Unable to create room.' });
    const updateChatters = await newRoom.addParticipant(adminId);
    if (!updateChatters || updateChatters.length === 0) res.status(400).json({ message: 'Cannot add user to room.' });
    res.status(201).json(newRoom);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// join a room
router.put('/:id', auth, async (req, res) => {
  const roomId = req.params.id;
  const { password, userId } = req.body;
  try {
    const roomData = await Room.findByPk(roomId, {
      attributes: ['id', 'name', 'password'],
      include: [
        {
          model: User,
          as: 'participant',
          attributes: ['id', 'username'],
        }
      ]
    });
    const userInRoom = roomData.participant.find(chatter => chatter.id === userId);
    if (userInRoom) return res.status(400).json({ message: 'User is already registered to room.' });
    const okPassword = await roomData.checkPassword(password);
    if (!okPassword) return res.status(403).json({ message: 'Incorrect room credentials.' })
    const enrollUser = await roomData.addParticipant([...roomData.participant, userId]);
    if (enrollUser) return res.status(201).json(enrollUser);
    return res.status(401).json({ message: 'Unable to join room.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;