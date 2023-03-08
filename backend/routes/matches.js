const express = require('express');
const router = express.Router();
const Match = require('../db/models/matchModel');
const { matchWinner } = require('../helpers/matchHelpers');

//GET ROUTE
router.get('/', (req, res) => {
  Match.find()
    .sort({ _id: -1 })
    .limit(10)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    })
})

//POST ROUTE
router.post('/', (req, res) => {
  const data = req.body;
  const match = new Match({
    player1: data.player1.name,
    player2: data.player2.name,
    score: [data.player1.score, data.player2.score],
    winner: matchWinner(data.player1, data.player2)
  });

  match.save()
    .then(() => {
      Match.find()
        .sort({ _id: -1 })
        .limit(10)
        .then((result) => {
          res.send(result);
        })
    })
    .catch((error) => {
      console.error(error);
    })
})

module.exports = router;