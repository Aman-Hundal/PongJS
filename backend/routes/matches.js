const express = require('express');
const router = express.Router();
const Match = require('../db/models/matchModel');

const matchWinner = function(player1Obj, player2Obj) {
  console.log(player1Obj.score)
  if (player1Obj.score > player2Obj.score) {
    return player1Obj.name;
  } else if (player1Obj.score < player2Obj.score) {
    return player2Obj.name;
  } else {
    return "Draw";
  }
}

router.get('/', (req, res) => {
  Match.find() //method on the model itself.
  .then((result) => {
    res.send(result);
  })
  .catch((error) => {
    console.error(error);
  })
})

router.post('/', (req, res) => {
  const data = req.body;

  const match = new Match({
    player1: data.player1.name,
    player2: data.player2.name,
    score: [data.player1.score, data.player2.score],
    winner: matchWinner(data.player1, data.player2)
  });

  match.save()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  })
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