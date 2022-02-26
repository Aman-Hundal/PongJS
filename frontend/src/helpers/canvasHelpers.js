const createBoard = (context, ball, rightPaddle, leftPaddle) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  
  //ball
  context.beginPath(); //general routine for howd you fill any shape
  context.fillStyle = 'white';
  context.arc(ball.x, ball.y, ball.r, 0, 2*Math.PI, true);
  context.fill(); //general routine for howd you fill any shape

  //paddle 1
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h);
  context.fill();

  //paddle 2
  context.beginPath();
  context.fillStyle = 'white';
  context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);
  context.fill();

};

const ballPaddleCollision = (ball, paddle) => {

  const paddleTop = paddle.y;
  const paddleBottom = paddle.y + paddle.h;
  const paddleLeft = paddle.x;
  const paddleRight = paddle.x + paddle.w;

  const ballTop = ball.y - ball.r;
  const ballBottom = ball.y + ball.r;
  const ballLeft = ball.x - ball.r;
  const ballRight = ball.x + ball.r;

  if (ballRight > paddleLeft && ballLeft < paddleRight && ballBottom > paddleTop && ballTop < paddleBottom) {
    return true;
  } else {
    return false;
  }
}

const gameOver = (scoreRef, timerRef) => {
  if (scoreRef.scoreP1 === 5 || scoreRef.scoreP2 === 5) {
    return true;
  }

  if (timerRef.secs === 0 && timerRef.mins === 0) {
    return true;
  }
}

// const updatePaddleR = function(context, paddle) {
//   paddle.y += paddle.vy;

//   if (paddle.y >= context.canvas.height-160) {
//     paddle.vy *= -1;
//     // console.log(paddle)
//   }

//   if (paddle.y <= 0) {
//     paddle.vy *= -1;
//     // console.log(paddle)
//   }
// }; //old computer paddle code

const ballReset = (ball, context, paddleRight, paddleLeft) => {
  const direction = [1, -1];
  ball.x = context.canvas.width/2;
  ball.y = context.canvas.height/2;
  ball.vx = 5 * direction[Math.floor(Math.random() * direction.length)];
  ball.vy = 0;
  ball.speed = 5;
  paddleRight.y = 320;
  paddleLeft.y = 320;
}

const startMotion = (ball) => {
  const direction = [1, -1];
  ball.vx = 5 * direction[Math.floor(Math.random() * direction.length)];
  ball.vy = 0;
  ball.speed = 5;
}

const userInput = (paddleLeft, paddleRight, ball, key) => {
  const paddleLTop = paddleLeft.y;
  const paddleLBottom = paddleLeft.y + paddleLeft.h;
  const paddleRTop = paddleRight.y;
  const paddleRBottom = paddleRight.y + paddleRight.h;

  if (key === "s" && paddleLBottom < 800) {
    paddleLeft.y += paddleLeft.vy;
    // console.log(paddleLeft)
  }

  if (key === "w" && paddleLTop > 0) {
    paddleLeft.y -= paddleLeft.vy;
    // console.log(paddle)
  }

  if (key === "5" && paddleRBottom < 800) {
    paddleRight.y += paddleRight.vy;
    // console.log(paddleLeft)
  }

  if (key === "8" && paddleRTop > 0) {
    paddleRight.y -= paddleRight.vy;
    // console.log(paddle)
  }

  if(key === "Enter" && ball.vx === 0) {
    startMotion(ball);
  }

}

module.exports = {
  createBoard,
  ballPaddleCollision,
  gameOver,
  ballReset,
  startMotion,
  userInput
}
