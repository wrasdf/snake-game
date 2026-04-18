## ADDED Requirements

### Requirement: Display game board with grid
The system SHALL render a rectangular game board with a visible grid showing all cells where the snake and food can exist.

#### Scenario: Render game board on load
- **WHEN** the page loads or game starts
- **THEN** a game board grid appears with clear cell boundaries

#### Scenario: Board is responsive
- **WHEN** the window is resized
- **THEN** the game board scales proportionally while maintaining the grid structure

### Requirement: Display snake on board
The system SHALL render the snake as a series of connected segments on the game board. The head segment SHALL be visually distinct from body segments.

#### Scenario: Render initial snake
- **WHEN** the game starts
- **THEN** the snake appears on the board with the head segment visually distinguished

#### Scenario: Update snake position each frame
- **WHEN** the game tick occurs
- **THEN** the snake's position updates on the board to reflect the new movement

### Requirement: Display food on board
The system SHALL render food blocks at their spawned positions using a distinct visual appearance from the snake.

#### Scenario: Render food block
- **WHEN** food is spawned
- **THEN** the food block appears on the board with a distinct visual style

### Requirement: Display current score
The system SHALL show the player's current score prominently above or beside the game board.

#### Scenario: Show score
- **WHEN** the game is running
- **THEN** the current score is visible and updates in real-time as the snake eats food

#### Scenario: Score starts at zero
- **WHEN** a new game starts
- **THEN** the score displays as 0

### Requirement: Provide game controls
The system SHALL display instructions indicating that arrow keys control the snake.

#### Scenario: Show controls
- **WHEN** the game page loads
- **THEN** instructions indicating "Use arrow keys to move the snake" are visible

### Requirement: Provide restart functionality
The system SHALL offer a way to restart the game after game-over.

#### Scenario: Show restart button
- **WHEN** the game ends
- **THEN** a restart button or option appears allowing the player to start a new game

#### Scenario: Reset on restart
- **WHEN** the player clicks restart
- **THEN** the board clears, the snake resets to starting position, score resets to 0, and a new game begins
