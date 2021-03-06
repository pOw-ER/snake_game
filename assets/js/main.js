const container = document.getElementById('container')
const containerWidth = 600
const containerHeight = 400
const paddleWidth = 100
const paddleHeight = 10
const ballDiameter = 20
let initialPosition = (containerWidth - paddleWidth) / 2
//[[top,left],[top,left],.....,]

let coordinates = [
    [1, 1], [1, 101], [1, 201], [1, 301], [1, 401], [1, 501],
    [31, 1], [31, 101], [31, 201], [31, 301], [31, 401], [31, 501],
    [61, 1], [61, 101], [61, 201], [61, 301], [61, 401], [61, 501],
]

coordinates.forEach(block => {
    let div = document.createElement('div')
    div.classList.add('block')
    div.style.top = block[0] + "px"
    div.style.left = block[1] + "px"
    container.appendChild(div)
})
let paddleTop = containerHeight - paddleHeight - 5
let paddleLeft = initialPosition
//draw paddle
function drawPaddle() {
    let paddle = document.createElement('div')
    paddle.classList.add('paddle')
    paddle.style.top = paddleTop + "px"
    paddle.style.left = paddleLeft + "px"
    container.appendChild(paddle)
}

drawPaddle()

function movePaddle() {
    document.body.addEventListener('keydown', (e) => {
        console.log(e);
        if (e.code == "ArrowRight") {
            console.log('right');
            if (paddleLeft < containerWidth - paddleWidth) {
                paddleLeft += 10
                console.log(document.querySelector('.paddle'))
                document.querySelector('.paddle').style.left = paddleLeft + "px"
            }
        } else if (e.code == "ArrowLeft") {
            console.log('left');
            if (paddleLeft > 0) {
                paddleLeft -= 10
                console.log(document.querySelector('.paddle'))
                document.querySelector('.paddle').style.left = paddleLeft + "px"
            }
        }
    })
}
movePaddle()

let positionBallX = initialPosition + paddleWidth / 2 - ballDiameter / 2
let positionBallY = containerHeight - ballDiameter - paddleHeight - 5

//draw ball
let ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
container.appendChild(ball)

let xDirection = 2
let yDirection = -1
let timer
function drawBall() {
    ball.style.left = positionBallX + "px"
    ball.style.top = positionBallY + "px"
}

function moveBall() {
    positionBallX += xDirection
    positionBallY += yDirection
    drawBall()
}
function checkCollision() {
    //check collision blocks
    for (let i = 0; i < coordinates.length; i++) {
        if (
            positionBallX >= coordinates[i][1] &&
            positionBallX <= coordinates[i][1] + 98 &&
            (positionBallY + ballDiameter) >= coordinates[i][0] &&
            positionBallY <= coordinates[i][0] + 28
        ) {
            console.log('collision')
            const blocks = document.querySelectorAll('.block')
            blocks[i].classList.remove('block')

            console.log(blocks)
            coordinates.splice(i, 1)
            changeDirection()
            drawBall()

        }
    }
    //check collision paddle 
    if (
        paddleLeft <= positionBallX &&
        (paddleLeft + paddleWidth) >= positionBallX &&
        paddleTop <= (positionBallY + ballDiameter)) {
        console.log('collision paddle')
        yDirection = -2
        drawBall()
    }

    //check border collision
    if (positionBallX >= containerWidth - ballDiameter) {
        xDirection = -2
        drawBall()
    }
    if (positionBallX <= 0) {
        xDirection = 2
        drawBall()
    }
    if (positionBallY <= 0) {
        yDirection = 2
        drawBall()
    }
    if ((positionBallY + ballDiameter) >= containerHeight) {
        console.log('lost')
        clearInterval(timer)
    }

}

timer = setInterval(() => {
    moveBall()
    checkCollision()
}, 20)


function changeDirection() {
    if (xDirection == 2 && yDirection == -2) {
        yDirection = 2
        return;
    }
    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2
        return;
    }
    if (xDirection == 2 && yDirection == 2) {
        yDirection = -2
        return;
    }
    if (xDirection == -2 && yDirection == 2) {
        yDirection = -2
        return;
    }
}