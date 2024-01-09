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
  as: 'admin',
  foreignKey: 'admin_id'
});

// many users can have access to a single room
Room.belongsToMany(User, {
  through: 'RoomUser',
  as: 'chatter',
  foreignKey: 'room_id',
  otherKey: 'chatter_id'
});

User.belongsToMany(Room, {
  through: 'RoomUser',
  as: 'chatter',
  foreignKey: 'chatter_id',
  otherKey: 'room_id'
});

export { User, Room, Message, RoomUser };
