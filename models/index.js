import User from "./User.js";
import Room from "./Room.js";
import Message from "./Message.js";
// import RoomUser from './RoomUser.js';

// --------------message to user----------------------------

// User has many messages and messages belong to many users
Message.belongsTo(User, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

User.hasMany(Message, {
  foreignKey: 'author_id',
});

// --------------message to room----------------------------

// Rooms have many messages and messages belong to a room
Message.belongsTo(Room, {
  foreignKey: 'room_id',
  onDelete: 'CASCADE',
});

Room.hasMany(Message, {
  foreignKey: 'room_id',
});

// --------------room to admin----------------------------

// an admin user has many rooms and a room belongs to an admin
// User.hasMany(Room, {
//   foreignKey: 'admin_id',
//   onDelete: 'CASCADE',
// });

// Room.belongsTo(User, {
//   as: 'admin',
//   foreignKey: 'admin_id'
// });

// --------------room to user----------------------------

// many users can have access to a single room
Room.belongsToMany(User, {
  through: 'RoomUser',
  // as: 'chatter',
  as: 'participant',
  foreignKey: 'room_id',
  otherKey: 'chatter_id'
});

User.belongsToMany(Room, {
  through: 'RoomUser',
  // as: 'chatter',
  as: 'location',
  foreignKey: 'chatter_id',
  otherKey: 'room_id'
});

export { User, Room, Message/*, RoomUser*/ };
