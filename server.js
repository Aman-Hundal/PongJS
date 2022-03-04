require('dotenv').config();
const express = require('express');
const app = express();
const matches = require('./routes/matches');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');  // ODM system for MongoDB (creates models for collections and etc)
const port = process.env.PORT || 5000;
const dbURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nilng.mongodb.net/${process.env.MONGODB_HOST}?retryWrites=true&w=majority`;
const cors = require('cors');


//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

//routes
app.use('/matches', matches);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
})

//DB setup
mongoose.connect(dbURL)
.then((result) => {
  app.listen(port, () => {
    console.log(`DB connected. Server listening on port ${port}.`);
  })
})
.catch((error) => {
  console.log(error);
})