## ADDED Requirements

### Requirement: User can control snake direction with arrow keys
The system SHALL accept arrow key inputs (up, down, left, right) and change the snake's direction accordingly. The snake SHALL move continuously in the current direction at a fixed game tick rate.

#### Scenario: Move snake up
- **WHEN** user presses the up arrow key
- **THEN** the snake's direction changes to up and moves upward on the next game tick

#### Scenario: Move snake down
- **WHEN** user presses the down arrow key
- **THEN** the snake's direction changes to down and moves downward on the next game tick

#### Scenario: Move snake left
- **WHEN** user presses the left arrow key
- **THEN** the snake's direction changes to left and moves leftward on the next game tick

#### Scenario: Move snake right
- **WHEN** user presses the right arrow key
- **THEN** the snake's direction changes to right and moves rightward on the next game tick

### Requirement: Prevent invalid direction changes
The system SHALL prevent the snake from reversing directly into itself (e.g., cannot go left if currently moving right).

#### Scenario: Reject reverse direction
- **WHEN** snake is moving right and user presses the left arrow key
- **THEN** the direction change is ignored and snake continues moving right

#### Scenario: Allow perpendicular direction
- **WHEN** snake is moving right and user presses the up arrow key
- **THEN** the direction changes to up on the next game tick
