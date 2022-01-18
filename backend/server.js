const express = require('express');
const app = express();
const matches = require('./routes/matches');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const port = process.env.PORT || 3001;

//DB setup
// mongoose.connect('mongodb://localhost/matches', {useNewUrlParser: true}); //connects to mongo DB. Mongoose is an express/node.js package that allows for ease use between mongo db and node/express. ITS AN ORM
// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log("Connected to database"));

//middleware
app.use(morgan('dev'));

//router routes
app.use('/matches', matches);


app.get('/', (req, res) => {
  res.send("Welcome to PongJS Index");
})

app.listen(port, () => {
  console.log("Server listening on port 3001");
})