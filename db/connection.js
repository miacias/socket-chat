import Sequelize from 'sequelize';

const excludeSessionLogs = (log) => {
  const sessionRegex = /session/i
  // checks if message contains session info
  if (sessionRegex.test(log)) {
    // skips logging the session message
    return;
  }
  // log all other messages
  console.log(log);
}

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306,
        logging: excludeSessionLogs,
      },
    );

export default sequelize;
