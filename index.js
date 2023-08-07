const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let highScore = JSON.parse(localStorage.getItem("user"));

ctx.fillStyle = "green";
ctx.strokeStyle = "blue";
squareCount = 33;

function drawX(x) {
  ctx.beginPath(0, 0);
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 700);
  ctx.strokeStyle = "grey";
  ctx.stroke();
}

function drawY(y) {
  ctx.beginPath(0, 0);
  ctx.moveTo(0, y);
  ctx.lineTo(680, y);
  ctx.strokeStyle = "grey";
  ctx.stroke();
}

function drawY2() {
  ctx.beginPath(0, 0);
  ctx.moveTo(680, 0);
  ctx.lineTo(680, 680);
  ctx.strokeStyle = "grey";
  ctx.stroke();
}

function drawX2() {
  ctx.beginPath(0, 0);
  ctx.moveTo(0, 680);
  ctx.lineTo(680, 680);
  ctx.strokeStyle = "grey";
  ctx.stroke();
}

function drawCanvas(canvas, context, size, squareCount) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i <= squareCount * size; i = i + size) {
    drawX(i);
  }
  for (let i = 0; i <= squareCount * size; i = i + size) {
    drawY(i);
  }
  drawY2();
  drawX2();
}

window.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowRight":
      if (snake.direction == "left") {
        return;
      }
      snake.direction = "right";
      break;
    case "ArrowDown":
      if (snake.direction == "up") {
        return;
      }
      snake.direction = "down";
      break;
    case "ArrowUp":
      if (snake.direction == "down") {
        return;
      }
      snake.direction = "up";
      break;
    case "ArrowLeft":
      if (snake.direction == "right") {
        return;
      }
      snake.direction = "left";
      break;
    case "d":
      if (snake.direction == "left") {
        return;
      }
      snake.direction = "right";
      break;
    case "s":
      if (snake.direction == "up") {
        return;
      }
      snake.direction = "down";
      break;
    case "w":
      if (snake.direction == "down") {
        return;
      }
      snake.direction = "up";
      break;
    case "a":
      if (snake.direction == "right") {
        return;
      }
      snake.direction = "left";
      break;
    case " ":
      console.log(gameState);
      if (gameState !== "active") {
        init();
      }
      break;
    default:
      console.log(e);
      console.log("Key is not implemented");
  }

  /*if (e.key==="ArrowRight"){
        snake.moveForward();
    }else if(e.key==="ArrowDown"){
        snake.moveDown();
    }else{
        console.log("Key is not implemented");
    }*/
});
function gameOver() {
  gameState = "over";

  if (highScore < snake.bodyParts.length) {
    highScore = snake.bodyParts.length - 1;
    localStorage.setItem("user", JSON.stringify(highScore));
  }
  highScore = JSON.parse(localStorage.getItem("user"));
  drawGameOver();
}

const size = 20;
let gameState = "active";

const snake = {
  bodyParts: [
    /*{x:10,y:16},{x:9,y:16},{x:8,y:16},{x:7,y:16},{x:6,y:16},{x:5,y:16},{x:4,y:16},{x:3,y:16},{x:2,y:16},{x:1,y:16},*/ {
      x: 0,
      y: 16,
    },
  ],
  color: "green",
  direction: "right",
  eatApple: function () {
    const newHead = { ...apple.body };
    this.bodyParts.unshift(newHead);
    placeApple();
    //draw();
  },
  moveLeft: function () {
    if (this.bodyParts[0].x == 0) {
      gameOver();
      return;
    }
    const newHead = { ...this.bodyParts[0] };
    newHead.x--;
    for (let i = 0; i < this.bodyParts.length; i++) {
      if (
        newHead.x == this.bodyParts[i].x &&
        newHead.y == this.bodyParts[i].y
      ) {
        gameOver();
        return;
      }
    }
    if (newHead.x == apple.body.x && newHead.y == apple.body.y) {
      this.eatApple();
      return;
    }

    this.bodyParts.unshift(newHead);
    this.bodyParts.pop();
    //draw();
  },
  moveRight: function () {
    if (this.bodyParts[0].x == 33) {
      gameOver();
      return;
    }
    const newHead = { ...this.bodyParts[0] };
    newHead.x++;
    for (let i = 0; i < this.bodyParts.length; i++) {
      if (
        newHead.x == this.bodyParts[i].x &&
        newHead.y == this.bodyParts[i].y
      ) {
        gameOver();
        return;
      }
    }
    if (newHead.x == apple.body.x && newHead.y == apple.body.y) {
      this.eatApple();
      return;
    }
    this.bodyParts.unshift(newHead);
    this.bodyParts.pop();
    //draw();
  },
  moveUp: function () {
    if (this.bodyParts[0].y == 0) {
      gameOver();
      return;
    }
    const newHead = { ...this.bodyParts[0] };
    newHead.y--;
    for (let i = 0; i < this.bodyParts.length; i++) {
      if (
        newHead.x == this.bodyParts[i].x &&
        newHead.y == this.bodyParts[i].y
      ) {
        gameOver();
        return;
      }
    }
    if (newHead.x == apple.body.x && newHead.y == apple.body.y) {
      this.eatApple();
      return;
    }
    this.bodyParts.unshift(newHead);
    this.bodyParts.pop();
    //draw();
  },
  moveDown: function () {
    if (this.bodyParts[0].y == 33) {
      gameOver();
      return;
    }
    const newHead = { ...this.bodyParts[0] };
    newHead.y++;
    for (let i = 0; i < this.bodyParts.length; i++) {
      if (
        newHead.x == this.bodyParts[i].x &&
        newHead.y == this.bodyParts[i].y
      ) {
        gameOver();
        return;
      }
    }
    if (newHead.x == apple.body.x && newHead.y == apple.body.y) {
      this.eatApple();
      return;
    }
    this.bodyParts.unshift(newHead);
    this.bodyParts.pop();
    //draw();
  },
};

const apple = {
  body: { x: 0, y: 0 },
  color: "red",
};

function placeApple() {
  apple.body.x = Math.floor(Math.random() * 32);
  apple.body.y = Math.floor(Math.random() * 32);
  for (let i = 0; i < snake.bodyParts.length; i++) {
    if (
      apple.body.x == snake.bodyParts[i].x &&
      apple.body.y == snake.bodyParts[i].y
    ) {
      placeApple();
    }
  }
}

function drawSnake() {
  ctx.fillStyle = snake.color;
  snake.bodyParts.forEach((element) => {
    ctx.fillRect(element.x * size, element.y * size, size, size);
  });
}

function drawApple() {
  ctx.beginPath();
  ctx.arc(
    size / 2 + apple.body.x * size,
    size / 2 + apple.body.y * size,
    size / 2,
    0,
    (size / 2) * Math.PI
  );
  ctx.fillStyle = apple.color;
  ctx.fill();
  //ctx.stroke();

  //while (m*20 % 4 !== 0, mm*20 % 4 !== 0);
}
function drawGameOver() {
  if (gameState !== "over") {
    return;
  }

  ctx.font = "50px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillRect(200, 260, 280, 190);
  ctx.fillStyle = "red";
  ctx.fillText("Game Over", 210, 340);
  ctx.fillStyle = "#338aff";
  ctx.fillRect(210, 380, 260, 50);
  ctx.fillStyle = "white";
  ctx.font = "30px sans-serif";

  ctx.fillText("Click space to start", 215, 415);
  ctx.fillStyle = "white";
  ctx.roundRect(230, 625, 220, 60, 20);
  ctx.fill();

  ctx.fillStyle = "black";
  ctx.fillText(`Your score ${snake.bodyParts.length - 1}`, 250, 660);

  ctx.fillStyle = "white";
  ctx.fillRect(45, 10, 220, 65);

  ctx.fillStyle = "black";
  ctx.fillText(`High score ${highScore}`, 50, 50);
}

function init() {
  snake.bodyParts = [{ x: 0, y: 16 }];
  snake.direction = "right";
  placeApple();
  gameState = "active";
  //draw();
}

function draw() {
  if (gameState !== "active") {
    return;
  }
  drawCanvas(canvas, ctx, size, squareCount);
  drawSnake();
  drawApple();
  drawGameOver();
}

init();

let stamp;

function refresh(timeStamp) {
  //console.log("timeStamp: " + timeStamp,stamp);
  if (stamp === undefined) {
    stamp = timeStamp;
  } else {
    const elapsed = timeStamp - stamp;
    if (elapsed > 1000 / 25) {
      stamp = timeStamp;
      draw();
    }
  }
  window.requestAnimationFrame(refresh);
  ctx.fillStyle = "black";
  ctx.font = "70px sans-serif";
  ctx.fillText(`${snake.bodyParts.length - 1}`, 700, 100);
}
window.requestAnimationFrame(refresh);

function speed() {
  return 200 / (1 + snake.bodyParts.length * 0.1);
}

function lifeCycle() {
  switch (snake.direction) {
    case "right":
      snake.moveRight();
      break;
    case "left":
      snake.moveLeft();
      break;
    case "up":
      snake.moveUp();
      break;
    case "down":
      snake.moveDown();
      break;
    default:
      console.log("direction undefined");
  }
  setTimeout(lifeCycle, speed());
}

lifeCycle();
