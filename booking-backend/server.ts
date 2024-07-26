import express, { Application, Request, Response } from 'express';
//installed TypeScript types for Node.js and Express
import dotenv from 'dotenv';

import cors from 'cors'; //npm install typescript @types/cors --save-dev
import mysql from 'mysql2';
import bodyParser from 'body-parser';

dotenv.config();
console.log('Database password:', process.env.DB_PASSWORD);


const app: Application = express()

app.use(cors(
  {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
  }
));

const port = 3001;
// Middleware

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const dbPassword = process.env.DB_PASSWORD;

const db = mysql.createConnection({

    host: 'localhost',
    user: 'oxanadots',
    password: '',
    database: 'booking_system',
//process.env.DB_PASSWORD
})

db.connect((err)=> {
    if(err){
        console.error('Error connecting to the database:', err);
        return 
    }
    console.log('Connected to the database')
})




app.post('/submit', (req: Request, res: Response) => {
  const {
    nameInput, 
     emailInput,
      phoneNumber, 
      eventType, 
      requiredService, 
      dateRequired } = req.body;

  const sql = 'INSERT INTO clients (nameInput, emailInput, phoneNumber, eventType, requiredService, dateRequired) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [nameInput, emailInput, phoneNumber, eventType, requiredService, dateRequired];
  console.log('Executing SQL:', sql, values); // Log the SQL and values


  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err); // Log the error
      return res.status(500).json({ error: err.message }); // Respond with the error message
    }
    console.log('Query results:', results)
    res.status(200).json({ message: 'Data inserted successfully!', data: results });
    
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});









// app.post('/submit', (req, res) => {
//     const { nameInput, emailInput, phoneNumber, eventType, requiredService, dateRequired } = req.body;
// console.log('Received input:', nameInput, emailInput, phoneNumber, eventType, requiredService, dateRequired );
//   res.json({ message: 'Data received successfully', nameInput, emailInput, phoneNumber, eventType, requiredService, dateRequired  });
// });
