# Snake Game - Playwright Testing Guide

This document outlines the Playwright browser testing setup for the Snake Game.

## Setup

### Install Dependencies

```bash
npm install
```

This will install both `playwright` and `@playwright/test`.

## Running Tests

### Run All Tests
```bash
npm test
```

This runs all tests in headless mode across Chromium, Firefox, and WebKit browsers.

### Run Tests in UI Mode
```bash
npm run test:ui
```

Opens Playwright's interactive test UI where you can:
- Run/debug individual tests
- Step through code
- View test execution in real-time
- Inspect elements and network traffic

### Run Tests in Debug Mode
```bash
npm run test:debug
```

Launches Inspector for debugging with breakpoints and step execution.

### Run Tests in Headed Mode
```bash
npm run test:headed
```

Runs tests with visible browser windows (useful for observation).

### Run Specific Test File
```bash
npx playwright test tests/game.spec.js
```

### Run Specific Test
```bash
npx playwright test -g "should load the game page successfully"
```

### Run Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Structure

### `tests/game.spec.js` - Core Functionality Tests

Tests organized into suites:

1. **UI & Initialization**
   - Page loads correctly
   - All UI elements present (canvas, score, buttons)
   - Initial game state

2. **Controls**
   - Arrow key responsiveness
   - No console errors during input

3. **Game Mechanics**
   - Game state exposure for testing
   - Snake movement and food spawning
   - Score updates when food is eaten
   - Wall collision detection
   - Self-collision detection

4. **Game Over & Restart**
   - Game-over overlay appears
   - Final score display
   - Game restart functionality
   - Play again after restart

5. **Cross-Browser Compatibility**
   - Canvas renders consistently
   - Keyboard input works across browsers
   - Frame timing consistency

### `tests/visual.spec.js` - Visual & Performance Tests

1. **Visual Regression**
   - Screenshot comparisons
   - Layout consistency
   - Responsive design validation
   - Window resize handling

2. **Canvas Rendering**
   - Snake and food rendering
   - Frame-by-frame updates
   - Aspect ratio maintenance

3. **Performance**
   - Memory leak detection
   - High-frequency input handling
   - Rapid restart cycles

4. **Accessibility**
   - Button labels and instructions
   - Color contrast
   - Keyboard navigation

## Test Reports

After running tests, reports are generated:

- **HTML Report**: `tests/test-results/index.html`
  - Open in browser: `npx playwright show-report`
  - Shows test results, screenshots, videos (on failure)
  - Detailed timing and error information

- **JSON Report**: `tests/test-results.json`
  - Machine-readable test results
  - Useful for CI/CD integration

## Advanced Testing

### Run with Specific Configuration

```bash
# Record traces (for debugging failures)
npx playwright test --trace on

# Take screenshots on failure
npx playwright test --screenshot only-on-failure

# Record videos
npx playwright test --video on
```

### Filter Tests by Tag

Tests can be filtered using the `-g` flag:

```bash
npx playwright test -g "@smoke"
npx playwright test -g "Game Mechanics"
```

### Run Tests in Parallel vs Serial

By default, tests run in parallel. Force serial execution with:

```bash
npx playwright test --workers=1
```

### Update Golden Screenshots

If intentional visual changes are made, regenerate screenshots:

```bash
npx playwright test --update-snapshots
```

## CI/CD Integration

Tests are configured to work in CI environments. Set the `CI` environment variable:

```bash
CI=true npm test
```

This configuration:
- Sets workers to 1 (serial execution)
- Retries tests up to 2 times
- Generates full reports
- Fails on any test failures

## Troubleshooting

### Tests Timeout
If tests timeout waiting for the server:
1. Verify server is running: `npm run serve`
2. Check if port 8000 is available
3. Increase timeout in `playwright.config.js`

### Canvas-Related Failures
Canvas rendering can vary slightly between browsers/platforms:
- Use `maxDiffPixels` in visual tests to allow small differences
- Mask dynamic elements (score, timestamps)
- Test game logic separately from rendering

### Cross-Browser Issues
If a test passes in one browser but fails in another:
1. Use `test.skip()` or `test.only()` to isolate
2. Check browser-specific behavior
3. Consider using `@playwright/test`'s `test.skip()` for known issues

## Best Practices

1. **Keep Tests Independent**: Each test should not depend on previous test results
2. **Use Locators**: Prefer CSS/XPath selectors over pixel coordinates
3. **Wait Wisely**: Use `waitForSelector` and `waitForNavigation` instead of fixed timeouts
4. **Isolate State**: Reset game state in `beforeEach` hooks
5. **Test User Behavior**: Focus on what users actually do (keyboard input, clicks)
6. **Mock When Needed**: Use `page.evaluate()` for controlled test scenarios
7. **Clean Up**: Tests automatically clean up resources, but watch for lingering processes

## Writing New Tests

Template for a new test:

```javascript
test('should describe the expected behavior', async ({ page }) => {
  // Arrange: Set up initial state
  await page.goto('/');

  // Act: Perform user action
  await page.press('body', 'ArrowUp');

  // Assert: Verify expected outcome
  await expect(page.locator('#gameCanvas')).toBeVisible();
});
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Guide](https://playwright.dev/docs/intro)
- [Locator Guide](https://playwright.dev/docs/locators)
- [Assertions Reference](https://playwright.dev/docs/test-assertions)
