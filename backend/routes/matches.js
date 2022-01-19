const express = require('express');
const router = express.Router();
const Match = require('../db/models/matchModel');

router.get('/', (req, res) => {
  res.send(Match.all)
})

router.post('/', (req, res) => {
  res.send("Creating Matches!");
})

// test of mongo db and creating a match document (using match model) for matches collections
// router.('/test', (req, res) =>{
//   const match = new Match({
//     player1: "Amo",
//     player2: "Elliot",
//     score: [5,3],
//     winner: "Amo"
//   });

//   match.save() //asynch task and returns a promise
//   .then((result) => {
//     res.send(result); //this is being sent from the mongodb itself (NOT THE ABOVE! match model instance created). This result is the actual match document in the matches colletion
//   })
//   .catch((error) => {
//     console.log(error);
//   })
// })

module.exports = router;