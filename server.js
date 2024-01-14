import {} from 'dotenv/config';
import express, { json, urlencoded } from 'express';
import session, { Store } from 'express-session';
import exphbs from 'express-handlebars';
import { createServer } from 'node:http';
import sequelize from './db/connection.js';
import { Server } from 'socket.io';
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
const io = new Server(server, {
  path: '/rooms'
});

const runServer = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database successfully synchronized.');
    server.listen(PORT, () => {
      console.log(`Server running on \x1b[35m http://localhost:${PORT} \x1b[0m`);
    });
  } catch (err) {
    console.error({ message: `\x1b[31m Server failed to initialize. \x1b[0m ${err}` });
  }
};

runServer();

export default { server, io };
