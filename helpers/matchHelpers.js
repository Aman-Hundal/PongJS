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

module.exports = {
  matchWinner
}