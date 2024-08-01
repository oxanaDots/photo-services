// models/User.js

import dotenv from 'dotenv'
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config({ path: '/Users/oksanadotsenko/Desktop/photo-services/.env' });

const dbPassword = process.env.DB_PASSWORD as string;


const sequelize = new Sequelize('booking_system', 'oxanadots', dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate().then(()=>{
    console.log("Connection has been established successfully")
}).catch((error: any)=>{
    console.error('Unable to connect to the database:', error)
})

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
}, {
    modelName: 'User',
  timestamps: true,
});

export default User
