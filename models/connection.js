const mysql = require("mysql");

const { PORT, SERVERNAME, DBUSER, PASSWORD, DB } = process.env;

const knex = require("knex")({
  client: "mysql",
  connection: {
    port: PORT,
    host: SERVERNAME,
    user: DBUSER,
    password: PASSWORD,
    database: DB,
  },
});

const pool = mysql.createConnection({
  host: SERVERNAME,
  user: DBUSER,
  password: PASSWORD,
  database: DB,
});

const connectToSQL = async () => {
  return pool.connect(function (err) {
    if (err) {
      console.log("Database connection fail!");
      throw err;
    }

    console.log("Database connection successful");
  });
};
module.exports = { pool, knex, connectToSQL };
