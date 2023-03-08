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

const ballReset = (ball, context, paddleRight, paddleLeft) => {
  const direction = [1, -1];
  ball.x = context.canvas.width/2;
  ball.y = context.canvas.height/2;
  ball.vx = 5 * direction[Math.floor(Math.random() * direction.length)];
  ball.vy = 0;
  ball.speed = 5;
  paddleRight.y = 280;
  paddleLeft.y = 280;
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

  if (key === "s" && paddleLBottom < 720) {
    paddleLeft.y += paddleLeft.vy;
  }

  if (key === "w" && paddleLTop > 0) {
    paddleLeft.y -= paddleLeft.vy;
  }

  if (key === "k" && paddleRBottom < 720) {
    paddleRight.y += paddleRight.vy;
  }

  if (key === "i" && paddleRTop > 0) {
    paddleRight.y -= paddleRight.vy;
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
