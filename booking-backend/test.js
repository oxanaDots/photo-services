const mysql = require('mysql2');
const fs = require('fs');

// Define connection parameters
const connection = mysql.createConnection({
  host: '35.246.32.36',
  user: 'oksana_dotsenko',
  password: '(^4&qiUa;Nb=$,2)',
  port: 3306,
  database: 'photo_services',
  ssl: {
    ca: fs.readFileSync('/certificates/server-ca.pem'), // Path to the CA file
    cert: fs.readFileSync('/certificates/client-cert.pem'), // Path to the client certificate
    key: fs.readFileSync('/certificates/client-key.pem') // Path to the client key
  }
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database successfully.');

  // Optionally run a query to verify access
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    console.log('Query result:', results[0].solution);

    // Close the connection
    connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err);
        return;
      }
      console.log('Connection closed successfully.');
    });
  });
});
