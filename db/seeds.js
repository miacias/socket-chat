import {} from 'dotenv/config';
import { User, Room, Message } from '../models/index.js';
import sequelize from './connection.js';

const userData = [
  {
    username: 'mia',
    password: 'password'
  },
  {
    username: 'john',
    password: 'password'
  },
  {
    username: 'henry',
    password: 'password'
  },
  {
    username: 'omar',
    password: 'password'
  },
  {
    username: 'vanessa',
    password: 'password'
  },
  {
    username: 'jun',
    password: 'password'
  },
  {
    username: 'wendy',
    password: 'password'
  },
  {
    username: 'jay',
    password: 'password'
  },
];

const seedUsers = async () => {
  const users = await User.bulkCreate(userData);
  const firstTwoUsers = {
    id1: users.slice(0, 1)[0].id,
    id2: users.slice(1, 2)[0].id,
  }
  return seedRooms(firstTwoUsers);
}

const seedRooms = async (firstTwoUsers) => {
  const roomData = [
    {
      name: 'mia\'s room',
      password: 'password',
      admin_id: firstTwoUsers.id1
    },
    {
      name: 'john\'s room',
      password: 'password',
      admin_id: firstTwoUsers.id2
    },
  ];
  const room1 = await Room.create(roomData[0]);
  await room1.addChatter(roomData[0].admin_id);
  const room2 = await Room.create(roomData[1]);
  await room2.addChatter(roomData[1].admin_id);
}

const seedDb = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  sequelize.close();
}

seedDb();
