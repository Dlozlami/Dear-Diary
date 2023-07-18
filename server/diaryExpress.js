const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
const ip = '192.168.0.232';
const ipb = '10.255.66.152';
const port = 8080;
const secretKey = '4f+7errqerqer742ereewqet42t4rg56ews-=-=2skep2-2wqokweidg8wqj2pss9tffb96ywaxboiada-=[;k28uw4rq4e';

mongoose.connect('mongodb://127.0.0.1:27017/dear-diary');

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    // Create a new user using the User model
    const newUser = new User({
      name,
      surname,
      email,
      password,
    });
    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

app.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
