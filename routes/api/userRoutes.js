import express from 'express';
const router = express.Router();
import { User, Room, Message } from '../../models/index.js';
// const { emitActions } = require("../events");
// const checkAuth = require("../middleware/checkAuth");

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.redirect('/');
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) res.status(400).json({ message: 'Unauthorized. Please check username and password.' });
    const passwordCheck = await user.checkPassword(password);
    if (!passwordCheck) res.status(400).json({ message: 'Unauthorized. Please check username and password.' });
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      res.status(201).json(user);
    })
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) res.redirect('/');
  try {
    const newUser = await User.create(req.body);
    if (!newUser) res.status(400).json({ message: 'Unauthorized. Please check username and password.' });
    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/logout', async (req, res) => {
  try {
    req.session.destroy(() => {
      return res.status(204).end();
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// router.post("/room", checkAuth, async (req, res) => {
//   const room = await db.rooms.create(req.body.roomname, req.session.userID);
//   req.socketServer.emit(emitActions.ROOM_CREATED);
//   res.redirect("/room/" + room.id);
// });

export default router;
