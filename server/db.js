const {Client} = require('pg');

const client = new Client({
  host: process.env.URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  PORT: process.env.PORT
});

client.connect()