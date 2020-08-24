let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
let lightFood = {
    x: -1,
    y: -1
};

function createBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

function configureLightFood() {
    lightFood.x = Math.floor(Math.random() * 15 + 1) * box;
    lightFood.y = Math.floor(Math.random() * 15 + 1) * box;

    const clearFoodInterval = setInterval(() => {
        lightFood.x = -1;
        lightFood.y = -1;

        clearInterval(clearFoodInterval);
    }, 5000);

}

function drawLightFood() {
    if (lightFood.x != -1) {
        context.fillStyle = 'blue';
        context.fillRect(lightFood.x, lightFood.y, box, box);
    }
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function beginGame() {
    if (snake[0].x > 15 * box) snake[0].x = 0;
    if (snake[0].x < 0) snake[0].x = 16 * box;
    if (snake[0].y > 15 * box) snake[0].y = 0;
    if (snake[0].y < 0) snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(gameInterval);
            alert('Game Over :(');
        }
    }

    createBG();
    createSnake();
    drawFood();
    drawLightFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'right') snakeX += box;
    if (direction === 'left') snakeX -= box;
    if (direction === 'up') snakeY -= box;
    if (direction === 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);


    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    if (snakeX == lightFood.x && snakeY == lightFood.y) {
        
        if (snake.length > 2) {
            snake.pop();
            snake.pop();            
        }
        else if (snake.length > 1) {
            snake.pop();
        }
        
        lightFood.x = -1;
        lightFood.y = -1;
    }
}

let gameInterval = setInterval(beginGame, 100);
let lightFoodInterval = setInterval(configureLightFood, 20000);