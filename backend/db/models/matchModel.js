const mongoose = require('mongoose');
const Schema = mongoose.Schema; //defines the strucuter of our documents insde of our collections

const matchSchema = new Schema({ //creates instance of schema object
  player1: {
    type: String,
    required: true
  },
  player2: {
    type: String,
    required: true
  },
  score: {
    type: [Number],
    required: true
  },
  winner: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Match = mongoose.model('Match', matchSchema); //first arg is name of model. KEEP IT SINGULAR, mongoose will pluralize it. The MongoDb collection is plural lower case like a table (called matchs). Second arg is the schema object that we want to base this model on

module.exports = Match;


