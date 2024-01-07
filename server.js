import {} from 'dotenv/config';
import express, { json, urlencoded } from 'express';
import session, { Store } from 'express-session';
import exphbs from 'express-handlebars';
import { createServer } from 'node:http';
import routes from './routes/index.js';
import sequelize from './db/connection.js';
import connectSessionSequelize from 'connect-session-sequelize';
import { Server } from 'socket.io';

const SequelizeStore = connectSessionSequelize(Store);
import helpers from './utils/helpers.js';

const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({ helpers });
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

export default { server, io };
