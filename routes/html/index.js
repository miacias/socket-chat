import express from 'express';
const router = express.Router();
import { User, Room, Message } from '../../models/index.js';
import sequelize from '../../db/connection.js';


// import db from '../db/connection';
// const checkAuth = require('../middleware/checkAuth')

router.get('/', async (req, res) => {
  const iChat = [];
  const iAdmin = [];
  try {
    // send room data to home dash if logged in
    if (req.session.userId) {
      const myRooms = await User.findByPk(req.session.userId, {
        attributes: ['id', 'username'],
        include: [
          {
          model: Room,
          as: 'location',
          attributes: ['id', 'name', 'admin_id'],
          include: [
            {
              // matches User from roomuser (as participant alias)
              model: User,
              as: 'participant',
              attributes: ['id', 'username'],
            },
            {
              // matches User from admin_id (as admin alias)
              model: User,
              as: 'admin',
              attributes: ['id', 'username'],
            },
          ]
          },
        ]
      });
      // sorts rooms based on being admin or chatter
      myRooms.location.forEach((room, index) => {
        room.admin_id === req.session.userId
          ? iAdmin[index] = room.get({ plain: true })
          : iChat[index] = room.get({ plain: true });
      });
      res.render('index', {
        loggedIn: !!req.session.userId,
        username: req.session.username,
        userId: req.session.userId,
        iChat,
        iAdmin
      });
    // send basic home page if logged out
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
