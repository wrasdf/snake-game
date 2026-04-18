## ADDED Requirements

### Requirement: Game ends on wall collision
The system SHALL end the game when the snake's head moves outside the game board boundaries.

#### Scenario: Hit top wall
- **WHEN** the snake moves upward and exits the top boundary
- **THEN** the game ends and displays a game-over state

#### Scenario: Hit bottom wall
- **WHEN** the snake moves downward and exits the bottom boundary
- **THEN** the game ends and displays a game-over state

#### Scenario: Hit left wall
- **WHEN** the snake moves leftward and exits the left boundary
- **THEN** the game ends and displays a game-over state

#### Scenario: Hit right wall
- **WHEN** the snake moves rightward and exits the right boundary
- **THEN** the game ends and displays a game-over state

### Requirement: Game ends on self-collision
The system SHALL end the game when the snake's head collides with its own body.

#### Scenario: Head hits body segment
- **WHEN** the snake's head position occupies the same cell as a body segment
- **THEN** the game ends and displays a game-over state

### Requirement: Display game-over message
The system SHALL display a clear game-over message with the final score when the game ends.

#### Scenario: Show game-over after collision
- **WHEN** the game ends due to collision
- **THEN** gameplay stops and a message displays "Game Over" with the final score and an option to restart
