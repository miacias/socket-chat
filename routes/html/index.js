import express from 'express';
const router = express.Router();
import { User, Room, Message } from '../../models/index.js';
import sequelize from '../../db/connection.js';


// import db from '../db/connection';
// const checkAuth = require('../middleware/checkAuth')

router.get('/', async (req, res) => {
  const iChat = [];
  const iAdmin = [];
  const allAdmins = [];
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
              model: User,
              as: 'participant',
              attributes: ['id', 'username'],
            },
          ]
          },
        ]
      });
      // console.log(myRooms.location[0].participant)
      myRooms.location.forEach((room, index) => {
        console.log(room)
        room.admin_id === req.session.userId
          ? iAdmin[index] = room.get({ plain: true })
          : iChat[index] = room.get({ plain: true });
        room.participant.forEach((chatter, index) => {
          if (room.admin_id === chatter.id) {
            allAdmins[index] = chatter;
          }
        });
      });
      console.log('all admins', allAdmins)
      // console.log('iChat', iChat)
      // console.log('iAdmin', iAdmin)
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
