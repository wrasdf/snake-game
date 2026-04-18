## ADDED Requirements

### Requirement: Food blocks spawn randomly on the game board
The system SHALL generate food blocks at random positions on the game board that do not overlap with the snake's current body.

#### Scenario: Spawn food at game start
- **WHEN** the game starts
- **THEN** one food block appears at a random empty position on the board

#### Scenario: Spawn food after snake eats
- **WHEN** the snake eats the current food block
- **THEN** a new food block spawns at a random empty position within 100ms

#### Scenario: Food never spawns on snake
- **WHEN** food is being spawned
- **THEN** the selected position does not overlap with any segment of the snake's body

### Requirement: Food remains visible on the board
The system SHALL display the food block at its current position until the snake consumes it.

#### Scenario: Food persists until eaten
- **WHEN** food is spawned on the board
- **THEN** the food block remains at the same position and visible until the snake collides with it
