import {} from 'dotenv/config';
import express, { json, urlencoded } from 'express';
import session, { Store } from 'express-session';
import exphbs from 'express-handlebars';
import { createServer } from 'node:http';
import sequelize from './db/connection.js';
import { Server as SocketServer } from 'socket.io';
import connectSessionSequelize from 'connect-session-sequelize';
import routes from './routes/index.js';

const SequelizeStore = connectSessionSequelize(Store);
import helpers from './utils/helpers.js';

const app = express();
const hbs = exphbs.create({ helpers });

const PORT = process.env.PORT || 3000;
const sessOptions = session({
  secret: process.env.SECRET,
  cookie: {
    // maxAge: 1800000, // 30 min
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
const io = new SocketServer(server, {
  // path: '/rooms'
});

io.on('connection', (socket) => {
  console.log(`\x1b[34m A user connected\x1b[0m`);

  socket.on('disconnect', () => {
    console.log(`\x1b[34m User disconnected\x1b[0m`);
  });

  // Handle room creation
  socket.on('createRoom', (roomName) => {
    socket.join(roomName);
    io.to(roomName).emit('message', `\x1b[34m You created ${roomName}\x1b[0m`);
  });

  // Handle room join
  // socket.on('joinRoom', (roomName) => {
  //   socket.join(roomName);
  //   io.to(roomName).emit('message', `You joined ${roomName}`);
  // });

  // Handle chat messages
  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('message', `\x1b[34m${data.message}\x1b[0m`/*, socket.request.session*/);
  });
});

const runServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(`\x1b[32m Database successfully re-synchronized. \x1b[0m`);
    server.listen(PORT, () => {
      console.log(`Server running on \x1b[35m http://localhost:${PORT} \x1b[0m`);
    });
  } catch (err) {
    console.error({ message: `\x1b[31m Server failed to initialize. \x1b[0m ${err}` });
  }
};

runServer();

export default { server, io };
