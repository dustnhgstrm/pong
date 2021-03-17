// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// call the game area
const gameArea = document.querySelector(".game-area");

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element and player paddle element
const computerPaddle = document.querySelector(".computer-paddle");
const playerPaddle = document.querySelector(".player-paddle");

// Initial computer paddle y-position and y-velocity
let computerPaddleYPosition = 200;
let computerPaddleYVelocity = 1.25;

// Initial player paddle y-position and y-velocity
let playerPaddleYPosition = 200;
let playerPaddleYVelocity = 0;

//get the green ball element
const greenBall = document.querySelector(".ball");

//initial green ball location
let greenBAllXPosition = 0;
let greenBallXVelocity = 1.25;
let greenBallYPosition = 0;
let greenBallYVelocity = 1.25;

// Update the pong world
function update() {
  // Update the computer paddle's position
  computerPaddleYPosition = computerPaddleYPosition + computerPaddleYVelocity;

  // Update the player paddle's position
  playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;

  // Make it change direction in reverse instead of restart at zero. make a boolean and set it to true at first to allow y velocity to be positive then switch value of y velocity every time the position modulo height-height of paddle = 0.
  const UpOrDownVelocity =
    computerPaddleYPosition % (GAME_AREA_HEIGHT - PADDLE_HEIGHT) === 0;
  if (UpOrDownVelocity) {
    computerPaddleYVelocity = computerPaddleYVelocity * -1;
  }

  // Apply the y-position to computer paddle
  computerPaddle.style.top = `${computerPaddleYPosition}px`;

  // Apply the y-position to the player paddle
  playerPaddle.style.top = `${playerPaddleYPosition}px`;
  // Update the green ball location
  greenBAllXPosition = greenBAllXPosition + greenBallXVelocity;
  greenBallYPosition = greenBallYPosition + greenBallYVelocity;

  // If the green ball goes off the screen at x=700 multiply x velocity by negative one
  const greenBallRight =
    greenBAllXPosition % (GAME_AREA_WIDTH - BALL_SIZE) === 0;
  //   const greenBallRightPaddleBlock = greenBAllXPosition % (GAME_AREA_WIDTH - BALL_SIZE) ===0;
  if (greenBallRight) {
    greenBallXVelocity = greenBallXVelocity * -1;
  }

  // If the green ball goes off the screen at y=500 -> multiply x velocity by negative one
  const greenBallTop =
    greenBallYPosition % (GAME_AREA_HEIGHT - BALL_SIZE) === 0;
  if (greenBallTop) {
    greenBallYVelocity = greenBallYVelocity * -1;
  }
  // case if the green ball and the paddles have the same height
  if (
    greenBallYPosition === computerPaddleYPosition &&
    greenBAllXPosition % (GAME_AREA_HEIGHT - BALL_SIZE - PADDLE_WIDTH) === 0
  ) {
    greenBallYPosition = greenBallYPosition * -1;
  }

  // Apply the y-position and the x-position to the green ball
  greenBall.style.left = `${greenBAllXPosition}px`;
  greenBall.style.top = `${greenBallYPosition}px`;

  //write functions for the control of key movements
  let upPressed = false;
  let downPressed = false;

  gameArea.addEventListener("keydown", keyDownCase, false);
  gameArea.addEventListener("keyup", keyUpCase, false);

  function keyDownCase(e) {
    if (e.key === "ArrowUp") {
      upPressed = true;
    } else if (e.key === "ArrowUp") {
      upPressed = true;
    }
  }

  function keyUpCase(e) {
    if (e.key === "ArrowDown") {
      downPressed = false;
    } else if (e.key === "ArrowDown") {
      downPressed = false;
    }
  }

  if (upPressed) {
    playerPaddleYVelocity += 1.25;
  } else if (downPressed) {
    playerPaddleYVelocity -= 1.25;
  }
}

// Call the update() function everytime the browser is ready to re-render
function loop() {
  update();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

//stretch goals: to make ball bounce off of paddles I must make it to where the ball reverses direction if the paddle and ball touch. i have the computer paddle position and if I set the paddle position to equal the ball position then it reverses.
