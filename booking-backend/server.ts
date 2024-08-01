import express, { Application, Request, Response } from 'express';
//installed TypeScript types for Node.js and Express
import dotenv from 'dotenv';

import cors from 'cors'; //npm install typescript @types/cors --save-dev
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import  User  from './models/models/User'
import path from 'path';



dotenv.config({ path: '/Users/oksanadotsenko/Desktop/photo-services/.env' });
console.log("Environment Variables:", process.env); // Add this line

console.log('Database password:', process.env.DB_PASSWORD);

const secret = process.env.JWT_SECRET_KEY as string;
const dbPassword = process.env.DB_PASSWORD as string;
const port = 3003;
const app: Application = express()
app.use(cors(
  {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
  }
));


// Middleware

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const db = mysql.createPool({

    host: 'localhost',
    user: 'oxanadots',
    password: dbPassword,
    database: 'booking_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})


// db.getConnection().then(conn => {
//    console.log('Connected to the database')
//    conn.release()
// }).catch (err =>{  
//   console.error('Error connecting to the database:', err)
// })

// async function connectToDatabase(){
//   try{
//     const conn = await db.getConnection()
//     console.log('Connected to the database')
//     conn.release()
//   } catch(error){
//     console.error('Error connecting to the database:', error)

//   }
// }

// connectToDatabase()

app.post('/submit', async (req: Request, res: Response) => {
  const {
    nameInput, 
     emailInput,
      phoneNumber, 
      eventType, 
      requiredService, 
      dateRequired } = req.body;


     

  const sqlBookingQuerry = 'INSERT INTO clients (nameInput, emailInput, phoneNumber, eventType, requiredService, dateRequired) VALUES (?, ?, ?, ?, ?, ?)';
  
  const bookingFormValues = [nameInput, emailInput, phoneNumber, eventType, requiredService, dateRequired];
  console.log('Executing SQL:', sqlBookingQuerry, bookingFormValues); // Log the SQL and bookingFormValues
  
  let connection;
  try{
    connection = await db.getConnection()
    const [results] = await connection.execute(sqlBookingQuerry, bookingFormValues);
    console.log('Query results:', results)
    res.status(200).json({message: 'Data inserted successfully', data: results})
  } catch (error){
    if(error instanceof Error){
      console.error('Error executing query:', error);
      res.status(500).json({error: error.message})
    } else{
      res.status(500).json({ error: 'Unknown error' });

    }
  } finally{
    if (connection) connection.release()
  }
})

app.post('/signup', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: 'The email is already taken' });
    }

    const usernameExists = await User.findOne({ where: { username } });
    if (usernameExists) {
      return res.status(409).json({ message: 'The username is already taken' });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hash });
    res.status(200).json({ message: 'User registered successfully', user: newUser });

    const signUpFormValues = [username, email, hash];
    const sqlSignUpQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    let connection;
    try {
      connection = await db.getConnection();
      const [results] = await connection.execute(sqlSignUpQuery, signUpFormValues);
      console.log('Query results:', results);
    } catch (err) {
      console.error('Error executing query:', err);
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    } finally {
      if (connection) connection.release();
    }
  } catch (err) {
    console.error('Error processing signup:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
``



app.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const signInSqlQuery = 'SELECT * FROM users WHERE username = ?';
  
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(signInSqlQuery, [username]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];
    const hashedPassword = user.password;
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secret, {
      expiresIn: '1h'
    });

    return res.status(200).json({ token });

  } catch (err) {
    console.error('Error executing query:', err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  } finally {
    if (connection) connection.release();
  }
});


app.use((req, res, next) => {
  console.error('404 error - Not Found:', req.originalUrl);
 return res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



