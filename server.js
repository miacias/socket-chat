import {} from 'dotenv/config';
import express, { json, urlencoded } from 'express';
import session, { Store } from 'express-session';
import exphbs from 'express-handlebars';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import routes from './routes/index.js';
import sequelize from './db/connection.js';
import connectSessionSequelize from 'connect-session-sequelize';

const SequelizeStore = connectSessionSequelize(Store);
import helpers from './utils/helpers.js';

const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({ helpers });
const sessOptions = session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1800000,
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
});

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(sessOptions);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

const server = createServer(app);
const io = new Server(server, {
  // path: '/hello'
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle room creation
  socket.on('createRoom', (roomName) => {
    socket.join(roomName);
    io.to(roomName).emit('message', `You joined ${roomName}`);
  });

  // Handle chat messages
  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('message', data.message);
  });
});

const serverPromise = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database successfully synchronized.');
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error({ message: `Server failed to initialize. ${err}` });
  }
};

serverPromise();
