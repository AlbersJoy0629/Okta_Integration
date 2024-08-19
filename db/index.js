const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5726725',
  password: 'vu4kpK16Lh',
  database: 'sql5726725',
  port: 3306,
  connectionLimit: 10 // Optional: Adjust connection limit if needed
});

const promisePool = pool.promise();

module.exports = promisePool;
