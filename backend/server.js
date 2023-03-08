require('dotenv').config({ path: "../.env" });
const express = require('express');
const app = express();
const matches = require('./routes/matches');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const dbURL = process.env.DATABASE_URL
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/matches', matches);
app.get('/', (req, res) => {
  res.send("Welcome to PongJS API");
});

//DB Connection and Server Start
mongoose.connect(dbURL)
.then((result) => {
  app.listen(PORT, () => {
    console.log(`DB connected. Server listening on port ${PORT}.`);
  })
})
.catch((error) => {
  console.log(error);
})