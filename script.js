const gamePlatform = document.querySelector("#gamePlatform");
const ctx = gamePlatform.getContext("2d");
const score = document.querySelector("#score");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gamePlatform.width;
const gameHeight = gamePlatform.height;
const gameBackground = "forestgreen";
const racket1Color = "white";
const racket2Color = "white";
const racketBorder = "darkgreen";
const ballColor = "blue";
const ballBorder = "darkblue";
const ballRadius = 12.5;
const racketSpeed = 50;
let intervalID;
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let racket1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}
let racket2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
}

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    makeBall();
    refresh();
};

function refresh() {
    intervalID = setTimeout(() => {
        clearPlatform();
        insertRacket();
        moveBall();
        insertBall(ballX, ballY);
        checkCollision();
        refresh();
    }, 10)
};

function clearPlatform(){
    ctx.fillStyle = gameBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function insertRacket() {
    ctx.strokeStyle = racketBorder;

    ctx.fillStyle = racket2Color;
    ctx.fillRect(racket2.y, racket2.x, racket2.width, racket2.height);
    ctx.strokeRect(racket2.y, racket2.x, racket2.width, racket2.height);
    ctx.fillStyle = racket1Color;
    ctx.fillRect(racket1.y, racket1.x, racket1.width, racket1.height);
    ctx.strokeRect(racket1.y, racket1.x, racket1.width, racket1.height);

};

function makeBall() {
    ballSpeed = 1;
    if(Math.round(Math.random()) == 1){
        ballXDirection = 1;
    }
    else{
        ballXDirection = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYDirection = 1;
    }
    else{
        ballYDirection = -1;
    }
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    insertBall(ballX, ballY);
};

function moveBall() {
    ballX += (ballSpeed * ballXDirection)
    ballY += (ballSpeed * ballYDirection)
};

function insertBall(ballX, ballY) {
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};

function checkCollision() {
    if(ballY <= 0 + ballRadius){
        ballYDirection *= -1;
    }
    if(ballY >+ gameHeight - ballRadius){
        ballYDirection *= -1;
    }
    if(ballX <= 0){
        player2Score+=1;
        updateScore();
        makeBall();
        return;
    }
    if(ballX >= gameWidth - ballRadius){
        player1Score+=1;
        updateScore();
        makeBall();
        return;
    }
    if(ballX <= (racket1.x + racket1.width + ballRadius)){
        if(ballY > racket1.y && ballY < racket1.y + racket1.height){
            ballX = (racket1.x + racket1.width) + ballRadius;
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
    if(ballX >= (racket2.x - ballRadius)){
        if(ballY > racket2.y && ballY < racket2.y + racket2.height){
            ballX = racket2.x - ballRadius;
            ballXDirection *= -1;
            ballSpeed += 1;
        }
    }
};

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const racket1Up = 87;
    const racket1Down = 83;
    const racket2Up = 38;
    const racket2Down = 40;
    switch (keyPressed) {
        case (racket1Up):
            if (racket1.x > 0) {
                racket1.x -= racketSpeed;
            }
            break;
        case (racket1Down):
            if (racket1.x < gameHeight - racket1.height) {
                racket1.x += racketSpeed;
            }
            break;
        case (racket2Up):
            if (racket2.x > 0) {
                racket2.x -= racketSpeed;
            }
            break;
        case (racket2Down):
            if (racket2.x < gameHeight - racket2.height) {
                racket2.x += racketSpeed;
            }
            break;
    }
};

function updateScore() {
    score.textContent = `${player1Score} : ${player2Score}`
};

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    racket1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    }
    racket2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    }
    ballSpeed = 1;
    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballYDirection = 0;
    updateScore();
    clearInterval(intervalID);
    gameStart();
};