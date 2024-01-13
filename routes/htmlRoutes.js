import express from 'express';
const router = express.Router();
import { User, Room, Message } from '../models/index.js';


// import db from '../db/connection';
// const checkAuth = require('../middleware/checkAuth')

router.get('/', async (req, res) => {
  try {
    if (req.session.userId) {
      let roomsAsAdmin = [];
      let roomsAsChatter = await Room.findAll({
        include: [{
          model: User,
          as: 'chatter',
          where: { id: req.session.userId }
        }],
        raw: true
      });
      if (roomsAsChatter) {
        // sort out which rooms are admin vs chatting
        roomsAsAdmin = roomsAsChatter.filter(room => room.admin_id === req.session.userId);
        console.log('admin', roomsAsAdmin)
        roomsAsChatter = roomsAsChatter.filter(room => room.admin_id !== req.session.userId);
        console.log('chat', roomsAsChatter)
        // const adminRoom = roomsAsAdmin.get({ plain: true });
        // const chatRoom = roomsAsChatter.get({ plain: true });
        res.render('index', {
          loggedIn: !!req.session.userId,
          username: req.session.username,
          userId: req.session.userId,
          roomsAsAdmin,
          roomsAsChatter
        });
      } else {
        roomsAsAdmin = await Room.findAll({
          include: [{
            model: User,
            as: 'admin',
            where: { id: req.session.userId }
          }],
          raw: true
        });
        res.render('index', {
          loggedIn: !!req.session.userId,
          username: req.session.username,
          userId: req.session.userId,
          roomsAsAdmin,
          roomsAsChatter
        });
      }
    } else {
      res.render('index', {
        loggedIn: !!req.session.userId,
        username: req.session.username,
        userId: req.session.userId,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/rooms', async (req, res) => {
  res.render('room', {
    loggedIn: !!req.session.userId,
    username: req.session.username,
    userId: req.session.userId,
  });
});

// router.get('/room/:id', checkAuth, async (req, res) => {
//   const roomID = req.params.id
//   if (!roomID) return res.redirect("/")
//   const room = await db.rooms.getByID(roomID)
//   if (!room) return res.redirect("/")
//   // res.render('room', {
//   //   name: room.name,
//   //   username: req.session.username,
//   //   messages: room.messages.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
//   // }) 
// })

export default router;
