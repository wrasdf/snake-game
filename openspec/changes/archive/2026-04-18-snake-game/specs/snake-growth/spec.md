## ADDED Requirements

### Requirement: Snake grows when eating food
The system SHALL increase the snake's length by one segment when the snake's head collides with a food block.

#### Scenario: Snake eats food
- **WHEN** the snake's head position occupies the same cell as the food block
- **THEN** the snake's length increases by one segment and score increases by 1

#### Scenario: New segment appears at tail
- **WHEN** the snake eats food
- **THEN** a new segment appears at the snake's previous tail position

#### Scenario: Snake body continues moving
- **WHEN** the snake eats food
- **THEN** the entire snake body (including the new segment) continues moving in the current direction

### Requirement: Score increments with food consumption
The system SHALL increment the player's score by 1 point each time the snake successfully eats food.

#### Scenario: Score increases on food eaten
- **WHEN** the snake eats a food block
- **THEN** the displayed score increases by 1
