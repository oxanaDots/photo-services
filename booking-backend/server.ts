import express, { Application, Request, Response } from 'express';
//installed TypeScript types for Node.js and Express
import dotenv from 'dotenv';

import cors from 'cors'; //npm install typescript @types/cors --save-dev
import mysql from 'mysql2/promise';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path'
import fs from 'fs'


const app: Application = express()
dotenv.config({ path: '/Users/oksanadotsenko/Desktop/photo-services/.env' });
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://photo-services-nine.vercel.app');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
}

  next();
});







const secret = process.env.JWT_SECRET_KEY as string;
const dbPassword = process.env.DB_PASSWORD as string;
const port = 3003;




// Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../dist')));

// // Catch-all route to serve index.html for SPA
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
// });


const db = mysql.createPool({
  //  host: 'localhost',
  //   user: 'root',  
  //   password: 'Borshchiv1996',
  //   database: 'photo_services',
  //   waitForConnections: true,
  //   connectionLimit: 10,
  //   connectTimeout: 30000,
  //   queueLimit: 0

    host: process.env.DB_HOST,
    user: process.env.DB_USER,  
    password: process.env.DB_PASSWORD,
    database: 'photo_services',
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 30000,
    queueLimit: 0,
    ssl: {
      ca: process.env.MYSQL_SSL_CA,
      cert: process.env.MYSQL_SSL_CERT,
      key: process.env.MYSQL_SSL_KEY
    }

})


db.getConnection().then(conn => {
   console.log('Connected to the database')
   conn.release()
}).catch (err =>{  
  console.error('Error connecting to the database:', err)
})

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
   return res.status(200).json({message: 'Data inserted successfully', data: results})
  } catch (error){
    if(error instanceof Error){
      console.error('Error executing query:', error);
     return  res.status(500).json({error: error.message})
    } else{
     return  res.status(500).json({ error: 'Unknown error' });

    }
  }  finally {
    if (connection) {
      console.log('Releasing connection...');
      await connection.release();
      console.log('Connection released');
    }
  }
})


app.post('/signup', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const signUpSqlQuery = 'INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())';
  const checkUsernameSqlQuery = 'SELECT * FROM users WHERE username = ?';
  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?'

  let connection;
  try {
    connection = await db.getConnection();
    console.log('Connection acquired');

    // Check if the username or email already exists
    const [existingUsernameUsers] = await connection.execute<mysql.RowDataPacket[]>(checkUsernameSqlQuery, [username]);
    const [existingEmailUsers] = await connection.execute<mysql.RowDataPacket[]>(checkEmailQuery, [email])
    console.log('Existing usernames:', existingUsernameUsers);
    console.log('Existing emails:', existingEmailUsers);

 if (existingEmailUsers.length > 0 && existingUsernameUsers.length > 0){
  return res.status(409).json({error: 'Email and username are taken'})
 } else if(existingUsernameUsers.length > 0){
  return res.status(409).json({ error: 'Username is already taken' });

 } else if(existingEmailUsers.length > 0){
  return res.status(409).json({error: 'Email is taken'})

 } else {

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    await connection.execute(signUpSqlQuery, [username, email, hashedPassword]);
    console.log('User inserted successfully');
    return res.status(201).json({ message: 'User created successfully' });
 }
  } catch (err) {
    console.error('Error during signup:', err);
    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    } 
  } finally {
    if (connection) {
      await connection.release();
      console.log('Connection released');
    }
  }
});




app.post('/signin', async (req: Request, res: Response) => {

  const { username, password } = req.body;

  const signInSqlQuery = 'SELECT * FROM users WHERE username = ?';
  
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(signInSqlQuery, [username]);

    console.log(rows)
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];
    const hashedPassword = user.password;
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    } else {

      const token = jwt.sign({ id: user.id, username: user.username }, secret, {
        expiresIn: '1h'
      });
  
      return res.status(200).json({ token });
    }


  } catch (err) {
    console.error('Error executing query:', err);
    if (err instanceof Error) {
     return  res.status(500).json({ error: err.message });
    } else {
    return  res.status(500).json({ error: 'Unknown error' });
    }
  } finally {
    if (connection) {
      console.log('Releasing connection...');
      await connection.release();
      console.log('Connection released');
    }
  }
});


app.use((req, res, next) => {
  console.error('404 error - Not Found:', req.originalUrl);
 return res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




