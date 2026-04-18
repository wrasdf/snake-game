## Context

The snake game project currently has all source files (JavaScript, CSS, configuration) at the root level. As the project grows, this flat structure becomes difficult to navigate and maintain. The goal is to organize files into semantic directories: `./js` for JavaScript files and `./css` for stylesheets.

Current file structure:
- `game.js`, `main.js`, `playwright.config.js` (root)
- `styles.css` (root)
- `index.html` references these files directly

## Goals / Non-Goals

**Goals:**
- Organize JavaScript files into `./js` directory
- Organize CSS files into `./css` directory
- Update all references to moved files
- Preserve git history and maintain functionality
- Keep the refactoring simple and minimal

**Non-Goals:**
- Changing file naming conventions
- Refactoring code logic or structure
- Adding new build tools or bundlers
- Modifying test configurations beyond path updates

## Decisions

1. **Use simple file movement (not bundling)**
   - Rationale: The project is small and doesn't need bundling complexity. Direct file moves with path updates are simpler and maintain current functionality.
   - Alternative considered: Set up webpack/bundler - rejected as over-engineering for current project size.

2. **Directory structure: `./js` and `./css`**
   - Rationale: Simple, clear semantic naming that matches common conventions.
   - Alternative: `./src/js`, `./src/css` - rejected as adding unnecessary nesting for this project size.

3. **Update references in files during refactoring**
   - JavaScript imports in `index.html` change from `game.js` to `js/game.js`
   - CSS link in `index.html` changes from `styles.css` to `css/styles.css`
   - `playwright.config.js` references updated if needed

4. **Use git mv to preserve history**
   - Rationale: Maintains commit history and blame information for each file.

## Risks / Trade-offs

**Risk: Broken references after move** → Mitigated by systematically updating all HTML and config file references before running tests.

**Risk: Test files may reference old paths** → Mitigated by checking and updating playwright.config.js paths if they reference moved files.

**Trade-off: Slightly deeper file hierarchy** → Offset by much improved organization and clarity as project grows.

## Migration Plan

1. Create `./js` and `./css` directories
2. Move JavaScript files: `game.js`, `main.js`, `playwright.config.js` to `./js`
3. Move CSS files: `styles.css` to `./css`
4. Update `index.html` script and link tag paths
5. Update any configuration files that reference moved paths
6. Run tests to verify all functionality works with new paths
