/*import Ball from './Ball.js'

let ball = new Ball(document.getElementById("ball"))

let lastTime
function refresh(time){
    if(lastTime != null){
        let delta = time - lastTime
        ball.refresh(delta)
    }
    lastTime = time
    window.requestAnimationFrame(refresh)
}

window.requestAnimationFrame(refresh)*/
const gamePlatform = document.querySelector("#gamePlatform")
const ctx = gamePlatform.getContext("2d")
const ball = document.getElementById("ball")
const racketSpeed = 50;
const gameWidth = window.innerWidth
const gameHeight = window.innerHeight
const resetButton = document.getElementById("resetButton")
let ballSpeed = 1;
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let intervalID;
let player2Score = 0;
let player1Racket = document.getElementById("player1-racket")
let player2Racket = document.getElementById("player2-racket")
let racketHeight = player1Racket.offsetHeight
let racket1Color = document.querySelector("--foreground-color")
let racket2Color = document.querySelector("--foreground-color")
let racketBorder = "green";
let racket1 = {
    width: 25,
    height: 100,
    x: 50,
    y: gameHeight / 2
}
let racket2 = {
    width: 25,
    height: 100,
    x: gameWidth - 75,
    y: gameHeight / 2
}

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    create
};

function refresh() {
    intervalID = setTimeout(() => {
        moveBall();
        checkCollision();
        refresh();
        insertRacket();
    }, 10)
};

function insertRacket() {
    ctx.strokeStyle = racketBorder

    ctx.fillStyle = racket1Color
    ctx.fillRect(racket1.y, racket1.x, racket1, width, racket1.height)
    ctx.strokeRect(racket1.y, racket1.x, racket1, width, racket1.height)

    ctx.fillStyle = racket2Color
    ctx.fillRect(racket2.y, racket2.x, racket2, width, racket2.height)
    ctx.strokeRect(racket2.y, racket2.x, racket2, width, racket2.height)
};

function makeBall() { };

function moveBall() { };

function insertBall() { };

function checkCollision() { };

function changeDirection(event) {
    const keyPressed = event.keyCode
    const racket1Up = 87
    const racket1Down = 83
    const racket2Up = 38
    const racket2Down = 40
    switch (keyPressed) {
        case (racket1Up):
            if (player1Racket.y > 0) {
                player1Racket.y -= racketSpeed
            }
            break
        case (racket1Down):
            if (player1Racket.y < gameHeight - racketHeight) {
                player1Racket.y += racketSpeed
            }
            break
        case (racket2Up):
            if (player2Racket.y > 0) {
                player2Racket.y -= racketSpeed
            }
            break
        case (racket2Down):
            if (player2Racket.y < gameHeight - racketHeight) {
                player2Racket.y += racketSpeed
            }
            break
    }
};

function updateScore() { };

function resetGame() { };