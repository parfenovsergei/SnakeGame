let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let grid = 20;
let count = 0;

let snake = { // змейка
// начальные координаты
    x: 200,
    y: 200,
// скорость змейки
    vx: grid,
    vy: 0,
// хвост
    cells: [],
// стартовая длина змейки
    maxCells: 4
};

let food = { //еда
// начальные координаты еды
    x: 340,
    y: 340
};

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function game() {
    requestAnimationFrame(game);
    if(++count < 4)
        return;

    count = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.vx;
    snake.y += snake.vy;

    // если змейка вышла за границы, то продолжим её движение с противоположной стороны
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if(snake.x >= canvas.width){
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if(snake.y >= canvas.height){
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Рисуем еду
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

    // Одно движение змейки — один новый нарисованный квадратик
    ctx.fillStyle = "green";
    // Обрабатываем каждый элемент змейки
    snake.cells.forEach(function(cell, index) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // Если змейка столкнулась с яблоком
        if (cell.x === food.x && cell.y === food.y){
            snake.maxCells++;
            food.x = getRandomInt(0, 25) * grid;
            food.y = getRandomInt(0, 25) * grid;
        }
        // Проверяем, не столкнулась ли змейка сама с собой
        // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами
        for(let i = index + 1; i < snake.cells.length; i++){
            // Если такие клетки есть, то начинаем игру заново
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y){
                // Задаем стартовые параметры
                    snake.x = 200;
                    snake.y = 200;
                    snake.cells = [];
                    snake.maxCells = 4;
                    snake.vx = grid;
                    snake.vy = 0;
                    // Ставим еду в случайное место
                    food.x = getRandomInt(0, 25) * grid;
                    food.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

// Обработчик событий нажатия на стрелки
document.addEventListener("keydown", function (e){
    // Влево
    if(e.keyCode === 37 && snake.vx === 0){
        snake.vx = -grid;
        snake.vy = 0;
    }
    // Вверх
    else if(e.keyCode === 38 && snake.vy === 0){
        snake.vx = 0;
        snake.vy = -grid;
    }
    // Вправо
    else if(e.keyCode === 39 && snake.vx === 0){
        snake.vx = grid;
        snake.vy = 0;
    }
    // Вниз
    else if(e.keyCode === 40 && snake.vy === 0){
        snake.vx = 0;
        snake.vy = grid;
    }
})

requestAnimationFrame(game);



