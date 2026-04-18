## Why

The project currently has all JavaScript and CSS files at the root level, making it harder to maintain as the project grows. Organizing files into dedicated directories (`./js` and `./css`) will improve code organization, maintainability, and make the project structure more scalable.

## What Changes

- Move all JavaScript files (`game.js`, `main.js`, `playwright.config.js`) into `./js` folder
- Move all CSS files (`styles.css`) into `./css` folder
- Update all import/script references in HTML and configuration files to point to the new locations
- Update build and test configuration files to reference assets in their new locations

## Capabilities

### New Capabilities
- `organized-file-structure`: Project files organized into semantic directories for improved maintainability and scalability

### Modified Capabilities
<!-- No existing capabilities require specification changes -->

## Impact

- HTML files: Update `<script>` and `<link>` tags to reference new file paths
- Configuration files: Update paths in `playwright.config.js`, `package.json` scripts
- Git: Files will be moved, preserving git history
- No API or public interface changes
