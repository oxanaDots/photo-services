import express, { Application, Request, Response } from 'express';
//installed TypeScript types for Node.js and Express

import mysql from 'mysql12';


const app: Application = express()
const port = 3001;

app.use(express.json());

const db = mysql.createConnection({

    host: 'localhost',
    user: '',
    password: '',
    database: 'booking_system'
})


