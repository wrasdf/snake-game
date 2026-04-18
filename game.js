// Game Configuration
const GRID_SIZE = 20;
const TILE_SIZE = 20;
const GAME_WIDTH = GRID_SIZE * TILE_SIZE;
const GAME_HEIGHT = GRID_SIZE * TILE_SIZE;
const TICK_RATE = 100; // milliseconds

// Direction constants
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Snake class
class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        // Start with snake in the middle
        const startX = Math.floor(GRID_SIZE / 2);
        const startY = Math.floor(GRID_SIZE / 2);
        this.body = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ];
        this.direction = DIRECTIONS.RIGHT;
        this.nextDirection = DIRECTIONS.RIGHT;
    }

    setDirection(newDirection) {
        // Prevent reversing into itself
        const isReverse =
            (this.direction.x === -newDirection.x && this.direction.y === -newDirection.y) ||
            (this.direction.x === newDirection.x && this.direction.y === newDirection.y);

        if (!isReverse) {
            this.nextDirection = newDirection;
        }
    }

    move() {
        this.direction = this.nextDirection;
        const head = this.body[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };
        this.body.unshift(newHead);
        this.body.pop();
    }

    grow() {
        // Add a new segment at the tail position
        const tail = this.body[this.body.length - 1];
        this.body.push({ x: tail.x, y: tail.y });
    }

    getHead() {
        return this.body[0];
    }

    getBody() {
        return this.body;
    }

    checkSelfCollision() {
        const head = this.getHead();
        for (let i = 1; i < this.body.length; i++) {
            const segment = this.body[i];
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
        return false;
    }
}

// Food class
class Food {
    constructor() {
        this.position = null;
        this.spawn();
    }

    spawn(snake = null) {
        let position;
        let isValid = false;

        while (!isValid) {
            position = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };

            // Check if position overlaps with snake
            isValid = true;
            if (snake) {
                for (const segment of snake.getBody()) {
                    if (position.x === segment.x && position.y === segment.y) {
                        isValid = false;
                        break;
                    }
                }
            }
        }

        this.position = position;
    }

    getPosition() {
        return this.position;
    }
}

// Game state
const gameState = {
    snake: new Snake(),
    food: new Food(),
    score: 0,
    isRunning: true,
    gameOver: false
};

// Game initialization
function initializeGame() {
    gameState.snake = new Snake();
    gameState.food = new Food();
    gameState.score = 0;
    gameState.isRunning = true;
    gameState.gameOver = false;
}

// Game tick - update game state
function gameTick() {
    if (!gameState.isRunning) {
        return;
    }

    // Move snake
    gameState.snake.move();

    // Check wall collision
    const head = gameState.snake.getHead();
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        endGame();
        return;
    }

    // Check self collision
    if (gameState.snake.checkSelfCollision()) {
        endGame();
        return;
    }

    // Check food collision
    const foodPos = gameState.food.getPosition();
    if (head.x === foodPos.x && head.y === foodPos.y) {
        gameState.snake.grow();
        gameState.score++;
        gameState.food.spawn(gameState.snake);
    }
}

// End game
function endGame() {
    gameState.isRunning = false;
    gameState.gameOver = true;
}

// Reset game
function resetGame() {
    initializeGame();
}

// Get game state for rendering
function getGameState() {
    return {
        snake: gameState.snake.getBody(),
        food: gameState.food.getPosition(),
        score: gameState.score,
        isGameOver: gameState.gameOver,
        isRunning: gameState.isRunning
    };
}

// Set snake direction (called from input handlers)
function setSnakeDirection(direction) {
    gameState.snake.setDirection(direction);
}
