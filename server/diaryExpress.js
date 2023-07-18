const express = require('express');
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

const ip = '10.255.66.152';
const port = 8080;
const secretKey = '4f+7errqerqer742ereewqet42t4rg56ews-=-=2skep2-2wqokweidg8wqj2pss9tffb96ywaxboiada-=[;k28uw4rq4e';
mongoose.connect('mongodb://127.0.0.1:27017/dear-diary')


