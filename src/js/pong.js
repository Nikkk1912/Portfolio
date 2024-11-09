const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

let paddleY = canvas.height / 2 - 30;
const paddleHeight = 60;
const paddleWidth = 10;
const wallX = canvas.width - 20;
const ballRadius = 5;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

function drawPaddle() {
    context.fillStyle = 'white';
    context.fillRect(10, paddleY, paddleWidth, paddleHeight);
}

function drawWall() {
    context.fillStyle = 'white';
    context.fillRect(wallX, 0, paddleWidth, canvas.height);
}

function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
}

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < 20 && ballY > paddleY && ballY < paddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballRadius > wallX) {
        ballSpeedX = -ballSpeedX;
    }
}

function movePaddleUp() {
    if (paddleY > 0) paddleY -= 15;
}

function movePaddleDown() {
    if (paddleY < canvas.height - paddleHeight) paddleY += 15;
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawWall();
    drawBall();
    updateBall();
    requestAnimationFrame(gameLoop);
}

document.getElementById('moveUp').addEventListener('click', movePaddleUp);
document.getElementById('moveDown').addEventListener('click', movePaddleDown);

gameLoop();

function restartGame() {
    paddleY = canvas.height / 2 - 30;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
}
