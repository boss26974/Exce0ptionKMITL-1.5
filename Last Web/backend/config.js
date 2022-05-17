const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'exceptionkmitl',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

module.exports = pool;