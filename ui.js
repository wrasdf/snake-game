// UI colors
const COLORS = {
    GRID: '#e0e0e0',
    SNAKE_HEAD: '#2ecc71',
    SNAKE_BODY: '#27ae60',
    FOOD: '#e74c3c',
    BACKGROUND: '#f0f0f0'
};

// Get canvas context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Render functions
function renderGame(state) {
    // Clear canvas
    ctx.fillStyle = COLORS.BACKGROUND;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Draw grid
    renderGrid();

    // Draw food
    renderFood(state.food);

    // Draw snake
    renderSnake(state.snake);

    // Draw score (redundant but good for in-canvas display if needed)
    // Score is shown in HTML, not on canvas
}

function renderGrid() {
    ctx.strokeStyle = COLORS.GRID;
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= GRID_SIZE; x++) {
        ctx.beginPath();
        ctx.moveTo(x * TILE_SIZE, 0);
        ctx.lineTo(x * TILE_SIZE, GAME_HEIGHT);
        ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= GRID_SIZE; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * TILE_SIZE);
        ctx.lineTo(GAME_WIDTH, y * TILE_SIZE);
        ctx.stroke();
    }
}

function renderSnake(snakeBody) {
    if (!snakeBody || snakeBody.length === 0) {
        return;
    }

    // Draw head
    const head = snakeBody[0];
    ctx.fillStyle = COLORS.SNAKE_HEAD;
    ctx.fillRect(head.x * TILE_SIZE + 1, head.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);

    // Draw body
    ctx.fillStyle = COLORS.SNAKE_BODY;
    for (let i = 1; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        ctx.fillRect(segment.x * TILE_SIZE + 1, segment.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
    }
}

function renderFood(foodPosition) {
    if (!foodPosition) {
        return;
    }

    ctx.fillStyle = COLORS.FOOD;
    ctx.beginPath();
    ctx.arc(
        foodPosition.x * TILE_SIZE + TILE_SIZE / 2,
        foodPosition.y * TILE_SIZE + TILE_SIZE / 2,
        TILE_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

function updateScore(score) {
    document.getElementById('score').textContent = score;
}

function showGameOver(score) {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverOverlay').classList.remove('hidden');
}

function hideGameOver() {
    document.getElementById('gameOverOverlay').classList.add('hidden');
}

function resetUI() {
    updateScore(0);
    hideGameOver();
}
