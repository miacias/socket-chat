import express from 'express';
const router = express.Router();

// import db from '../db/connection';
// const checkAuth = require('../middleware/checkAuth')


router.get('/', (req, res) => {
  res.render('index', {
    // loggedIn: !!req.session.userID,
    // username: req.session.username,
  })
})

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
