import express from 'express';
const router = express.Router();
// import { users } from "../db/connection.js";
// const { emitActions } = require("../events");
// const checkAuth = require("../middleware/checkAuth");

// router.get("/login", async (req, res) => {
//   const { username } = req.query;
//   if (!username) res.redirect("/");
//   try {
//     const user = await users.create(username);
//     req.session.userID = user.id;
//     req.session.username = user.username;
//     res.redirect("/");
//   } catch(err) {
//     res.status(400).send(err.message);
//   }
// });

// router.get("/logout", async (req, res) => {
//   await users.remove(req.session.userID)
//   req.session.destroy();
//   res.redirect("/")
// });

// router.post("/room", checkAuth, async (req, res) => {
//   const room = await db.rooms.create(req.body.roomname, req.session.userID);
//   req.socketServer.emit(emitActions.ROOM_CREATED);
//   res.redirect("/room/" + room.id);
// });

export default router;
