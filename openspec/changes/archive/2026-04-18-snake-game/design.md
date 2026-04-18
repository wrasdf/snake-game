## Context

Building a snake game from scratch requires a new web application with game loop mechanics, collision detection, and real-time rendering. The game will run entirely in the browser using HTML5 Canvas for rendering, supporting all modern browsers without backend dependencies.

## Goals / Non-Goals

**Goals:**
- Create a playable snake game with smooth, responsive 4-directional controls
- Implement food spawning and snake growth mechanics
- Provide collision detection for walls and self-collision
- Display real-time score tracking and game state
- Ensure responsive design that works on different screen sizes

**Non-Goals:**
- Multiplayer support or online leaderboards
- Complex AI or different difficulty levels
- Mobile touch controls (keyboard only)
- Advanced graphics or animations
- Sound effects or background music
- Game state persistence or saving

## Decisions

### Decision: Use HTML5 Canvas for rendering
**Rationale:** Canvas provides direct pixel control and is optimized for real-time games. It's native to browsers, requires no external libraries, and performs well for 2D grid-based games.

**Alternatives considered:**
- DOM elements: Slower, poor for real-time updates
- WebGL: Overkill for a 2D grid-based game
- SVG: Not optimized for rapid frame-by-frame updates

### Decision: Implement game loop with requestAnimationFrame
**Rationale:** `requestAnimationFrame` synchronizes with the browser's refresh rate, ensuring smooth 60 FPS gameplay without excessive CPU usage.

**Alternatives considered:**
- `setInterval`: Less efficient, doesn't sync with browser refresh cycle
- `setTimeout`: Manual timing management adds complexity

### Decision: Store snake as array of coordinates
**Rationale:** Representing the snake as an ordered array of {x, y} coordinates makes movement, growth, and collision detection straightforward. Removing the tail and adding a head per tick is O(1) amortized.

**Alternatives considered:**
- Linked list: Unnecessary complexity for JavaScript
- Set-based collision detection: Would require constant conversion

### Decision: Fixed tile-based grid system
**Rationale:** A fixed grid (e.g., 20x20 tiles) simplifies collision detection, food spawning, and rendering. Each entity occupies exactly one tile, avoiding floating-point precision issues.

### Decision: Prevent same-tick direction reversals via buffering
**Rationale:** Store the next direction input rather than applying immediately. Process buffered direction at the game tick, preventing invalid reverse moves.

**Alternatives considered:**
- Reject reverse moves at input time: Less responsive to rapid key presses
- Allow reversals: Leads to immediate self-collision (bad UX)

### Decision: Spawn food using simple random retry
**Rationale:** Randomly generate positions until finding an empty cell. For typical game sizes, this is fast enough. Simple implementation without complex algorithms.

**Alternatives considered:**
- Fisher-Yates shuffle of all empty cells: Overkill for small grids
- Pre-compute empty cells: Adds unnecessary state management

## Risks / Trade-offs

| Risk | Mitigation |
|------|-----------|
| Canvas performance on low-end devices | Reduce grid size or tick rate if needed; test on target devices |
| Flickering or tearing during renders | Double-buffer internally (canvas handles this); ensure single clear + draw cycle |
| Input lag on high-latency devices | Buffer inputs and process on tick; not frame-dependent |
| Food spawn collision on large snake | If snake is very large, random retry could stall; add max retry limit (unlikely edge case) |
| No visual feedback on invalid moves | Design is acceptable; invalid reverse moves are silent |

## Technical Stack

- **Language:** JavaScript (ES6+)
- **Markup:** HTML5
- **Styling:** CSS3
- **Rendering:** HTML5 Canvas 2D Context
- **No external dependencies** (vanilla JS implementation)

## File Structure

```
index.html          - Main page with canvas element
styles.css          - Game styling and responsive design
game.js             - Core game logic (snake, food, collision)
ui.js               - UI rendering and updates
main.js             - Entry point and event handling
```
