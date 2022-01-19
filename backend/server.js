require('dotenv').config();
const express = require('express');
const app = express();
const matches = require('./routes/matches');
const morgan = require('morgan');
const mongoose = require('mongoose');  // ODM system for MongoDB (creates models for collections and etc)
const port = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nilng.mongodb.net/${process.env.MONGODB_HOST}?retryWrites=true&w=majority`;

//DB setup
mongoose.connect(dbURL)
  .then((result) => {
    app.listen(port, () => {
      console.log("DB connected. Server listening on port 3001.");
    })
  })
  .catch((error) => console.error(error));

  //middleware
app.use(morgan('dev'));

//routes
app.use('/matches', matches);

app.get('/', (req, res) => {
  res.send("Welcome to PongJS Index");
})