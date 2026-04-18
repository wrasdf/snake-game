// Game loop state
let lastTickTime = 0;
let animationFrameId = null;

// Initialize game on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
    resetUI();
    setupEventListeners();
    startGameLoop();
});

// Setup event listeners for keyboard input
function setupEventListeners() {
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('restartBtn').addEventListener('click', handleRestart);
}

// Handle keyboard input
function handleKeyPress(event) {
    const key = event.key;

    switch (key) {
        case 'ArrowUp':
            event.preventDefault();
            setSnakeDirection(DIRECTIONS.UP);
            break;
        case 'ArrowDown':
            event.preventDefault();
            setSnakeDirection(DIRECTIONS.DOWN);
            break;
        case 'ArrowLeft':
            event.preventDefault();
            setSnakeDirection(DIRECTIONS.LEFT);
            break;
        case 'ArrowRight':
            event.preventDefault();
            setSnakeDirection(DIRECTIONS.RIGHT);
            break;
    }
}

// Handle restart button click
function handleRestart() {
    resetGame();
    resetUI();
    lastTickTime = 0;
}

// Main game loop
function gameLoop(currentTime) {
    // Calculate elapsed time since last tick
    if (lastTickTime === 0) {
        lastTickTime = currentTime;
    }

    const deltaTime = currentTime - lastTickTime;

    // Update game at tick rate
    if (deltaTime >= TICK_RATE) {
        gameTick();
        lastTickTime = currentTime;

        // Get current game state
        const state = getGameState();

        // Render game
        renderGame(state);

        // Update UI
        updateScore(state.score);

        // Check if game is over
        if (state.isGameOver) {
            showGameOver(state.score);
        }
    }

    // Continue loop
    animationFrameId = requestAnimationFrame(gameLoop);
}

// Start the game loop
function startGameLoop() {
    lastTickTime = 0;
    animationFrameId = requestAnimationFrame(gameLoop);
}

// Stop the game loop (if needed)
function stopGameLoop() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}
