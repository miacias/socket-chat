import User from "./User.js";
import Room from "./Room.js";
import Message from "./Message.js";
import RoomUser from './RoomUser.js';

// User has many messages and messages belong to many users
Message.belongsTo(User, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

User.hasMany(Message, {
  foreignKey: 'author_id',
});

// Rooms have many messages and messages belong to a room
Message.belongsTo(Room, {
  foreignKey: 'room_id',
  onDelete: 'CASCADE',
});

Room.hasMany(Message, {
  foreignKey: 'room_id',
});

// an admin user has many rooms and a room belongs to an admin
User.hasMany(Room, {
  foreignKey: 'admin_id',
});

Room.belongsTo(User, {
  as: 'admin'
});

// many users can have access to a single room
Room.belongsToMany(User, {
  through: 'RoomUser',
  as: 'chatter'
})

export { User, Room, Message, RoomUser };
