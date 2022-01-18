const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Welcome to PongJS Matches API");
})

router.post('/', (req, res) =>{
  res.send("PongJS Matches post route");
})

module.exports = router;