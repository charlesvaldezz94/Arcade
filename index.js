const gameboard = document.querySelector("#gameboard");

const context = gameboard.getContext("2d");

const gameWidth = gameboard.width;
const gameHeight = gameboard.height;

const scoreDisplay = document.getElementById("score");

const resetButton = document.getElementById("reset");

let running = false; // to see if game is currently running or not

const unitSize = 25;

let score = 0;

//snake
const snakeColor1 = "yellow";
const snakeColor2 ="darkgreen";
const snakeBorder = "black";
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 }, 
  { x: unitSize, y: 0 }, 
  { x: 0, y: 0 }
];
//snake is array of body parts, each object is a body part of the snake
console.log(snake)

let xVelo = unitSize;
let yVelo = 0;

//Food
const foodColor = "red";
let foodX;
let foodY;

const boardBackground = "rgb(90, 170, 137)";

window.addEventListener("keydown", changeDirection);

resetButton.addEventListener('click', resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreDisplay.innerText = score;
  makeFood();
  drawFood();
  nextTick();
}

function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
};

function clearBoard() {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
}

function moveSnake() {
  const head = { x: snake[0].x + xVelo, y: snake[0].y + yVelo };
  snake.unshift(head); //what causes the snake to grow (adds new elements onto the array)
  //if food is eaten
  if(snake[0].x == foodX && snake[0].y == foodY){
    score+=1;
    scoreDisplay.innerText = score;
    makeFood()
  }
  else {
    snake.pop() //removes last element form the array (if the snake did not "eat, another element is NOT added to the original array, thus the snake does not grow any longer")
  };
};

function drawSnake() {
  // for (let i = 0; i < snake.length; i++) {
    // if (i %2 === 0) {
    //   snakecontext.fillStyle = snakeColor1;  
    // }
    // else {
    //   snakecontext.fillStyle = snakeColor2;
    // }
  context.strokeStyle = snakeBorder;
  snake.forEach((snakePart, index) => {
    //  context.fillStyle = snakeColor2;
     
    console.log(snakePart, 'index!!')
   
    if (index === 0) {
      console.log('index0')
      context.fillStyle = snakeColor1;
    }
    else if (index %2 === 0) {
      console.log('even')
        context.fillStyle = snakeColor1;  
      }
      else {
        console.log('odd')
        context.fillStyle = snakeColor2;
      }
      context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })
}

//Movement

function changeDirection(event){
    const keyPressed = event.keyCode;
    const left = 65;
    const right = 68;
    const up = 87;
    const down = 83;

    const goingUp = (yVelo == -unitSize);
    const goingDown = (yVelo == unitSize);
    const goingRight = (xVelo == unitSize);
    const goingLeft = (xVelo == -unitSize);

    switch(true) {
        case(keyPressed == left && !goingRight):
            xVelo = -unitSize;
            yVelo = 0;
            break;
        case(keyPressed == up && !goingDown):
            xVelo = 0
            yVelo = -unitSize;
            break;
        case(keyPressed == right && !goingLeft):
            xVelo = unitSize;
            yVelo = 0;
            break;
        case(keyPressed == down && !goingUp):
            xVelo = 0
            yVelo = unitSize;
            break;
    };

}

//Food Location
function makeFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood() {
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, unitSize, unitSize);
}


function checkGameOver(){
  console.log(snake[0].x)
  console.log(snake[0].y)
    switch(true){
        case (snake[0].x < 0):
            running = false;
            // console.log('caseX1statement')
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            // console.log('caseX2statement')
            break;
        case (snake[0].y < 0):
            running = false;
            // console.log('caseY1statement')
            break;
        case (snake[0].y >= gameHeight):
                running = false;
                // console.log('caseY2statement')
                break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          console.log(snake)
            running = false;
        }
    }
};


function displayGameOver() {
    alert("GAME OVER");
    running = false;
};

function resetGame() {
    score = 0;
    xVelo = unitSize;
    yVelo = 0;
    snake = [
      { x: unitSize * 4, y: 0 },
      { x: unitSize * 3, y: 0 },
      { x: unitSize * 2, y: 0 }, 
      { x: unitSize, y: 0 }, 
      { x: 0, y: 0 }
    ];
      gameStart();
};