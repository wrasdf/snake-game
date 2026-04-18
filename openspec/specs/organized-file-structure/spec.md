# Organized File Structure

## Purpose

Organize project files into semantic directories (JavaScript in `./js`, CSS in `./css`) to improve code maintainability, navigation, and project scalability as the codebase grows.

## Requirements

### Requirement: JavaScript files organized in js directory
The project SHALL maintain all JavaScript source files in a dedicated `./js` directory to improve code organization and maintainability.

#### Scenario: Game files in js directory
- **WHEN** the project is deployed
- **THEN** `game.js`, `main.js`, and `playwright.config.js` are located in `./js/`

#### Scenario: HTML references updated game scripts
- **WHEN** `index.html` is loaded
- **THEN** script tags reference `js/game.js` and `js/main.js` successfully

### Requirement: CSS files organized in css directory
The project SHALL maintain all CSS files in a dedicated `./css` directory for improved asset organization.

#### Scenario: Styles in css directory
- **WHEN** the project is deployed
- **THEN** `styles.css` is located in `./css/`

#### Scenario: HTML references updated stylesheet
- **WHEN** `index.html` is loaded
- **THEN** the link tag references `css/styles.css` successfully and styles are applied

### Requirement: Configuration files updated for new paths
Configuration files that reference moved assets SHALL be updated to use the new directory paths.

#### Scenario: Playwright config uses updated paths
- **WHEN** tests run
- **THEN** `playwright.config.js` in `./js/` can execute without path-related errors

#### Scenario: Game functionality intact after refactoring
- **WHEN** the game loads after refactoring
- **THEN** all game functionality operates normally with files in new locations
