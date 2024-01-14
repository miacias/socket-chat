import {} from 'dotenv/config';
import { User, Room, Message } from '../models/index.js';
import sequelize from './connection.js';

const userData = [
  'mia', 'john', 'henry', 'omar', 'vanessa', 'jun', 'wendy', 'jay'
];

const seedUsers = async () => {
  const users = await User.bulkCreate(userData.map(username => ({ username, password: 'password' })));
  return seedRooms(users);
}

const seedRooms = async (users) => {
  const roomData = [
    {
      name: 'mia\'s room',
      password: 'password',
      admin_id: users[0].id
    },
    {
      name: 'john\'s room',
      password: 'password',
      admin_id: users[1].id,
    },
  ];
  const room1 = await Room.create(roomData[0]);
  await room1.addChatter(roomData[0].admin_id);
  const room2 = await Room.create(roomData[1]);
  await room2.addChatter(roomData[1].admin_id);
  return joinRoom(room1, room2, users)
};

const joinRoom = async (room1, room2, users) => {
  await room1.addChatter(users[2].id);
  await room2.addChatter(users[3].id);
  return;
};

const seedDb = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedUsers();
    console.log(`\x1b[32m Users, Rooms, and RoomUsers successfully seeded. \x1b[0m`);
  } catch (err) {
    console.log(`\x1b[31m Failure seeding database: \x1b[0m ${err}`);
  } finally {
    sequelize.close();
  }
};

seedDb();
