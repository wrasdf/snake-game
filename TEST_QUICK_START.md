# Quick Start - Running Tests

## One-Time Setup

```bash
npm install
```

## Run Tests

### Option 1: Run All Tests (Headless, Fast)
```bash
npm test
```
✅ Best for: CI/CD, quick validation, all browsers

### Option 2: Run Tests with UI (Interactive)
```bash
npm run test:ui
```
✅ Best for: Development, debugging, real-time observation

### Option 3: Run Tests in Debug Mode
```bash
npm run test:debug
```
✅ Best for: Troubleshooting, step-by-step execution

### Option 4: Run Tests with Visible Browsers
```bash
npm run test:headed
```
✅ Best for: Visual verification, seeing what the game does

## View Results

After running tests:

```bash
# View HTML report with screenshots/videos
npx playwright show-report
```

## Running Specific Tests

```bash
# Run only game mechanics tests
npx playwright test game.spec.js -g "Game Mechanics"

# Run only on Chrome
npx playwright test --project=chromium

# Run only one test
npx playwright test -g "should load the game page successfully"
```

## Common Commands

| Task | Command |
|------|---------|
| Run all tests | `npm test` |
| Interactive UI | `npm run test:ui` |
| Debug mode | `npm run test:debug` |
| Visible browsers | `npm run test:headed` |
| Single browser | `npx playwright test --project=chromium` |
| Single test file | `npx playwright test tests/game.spec.js` |
| Specific test | `npx playwright test -g "test name"` |
| View report | `npx playwright show-report` |
| Update screenshots | `npx playwright test --update-snapshots` |

## What Gets Tested

✅ **UI Elements** - Canvas, score display, restart button
✅ **Controls** - Arrow key input responsiveness
✅ **Game Logic** - Snake movement, food spawning, collisions
✅ **Game Over** - Collision detection and restart
✅ **Visual** - Screenshots and layout consistency
✅ **Performance** - Memory usage and frame timing
✅ **Accessibility** - Keyboard navigation

## Test Coverage by Browser

Tests run on:
- 🔵 **Chromium** (Chrome/Edge)
- 🔴 **Firefox**
- 🟣 **WebKit** (Safari)

## Troubleshooting

**Tests won't run?**
```bash
npx playwright install  # Install browsers
npm install            # Install dependencies
```

**Tests timeout?**
- Verify game server would start with: `npm run serve`
- Kill any processes on port 8000: `lsof -i :8000`

**Screenshots differ?**
- Update them: `npx playwright test --update-snapshots`
- Or adjust tolerance: Modify `maxDiffPixels` in test file

## For Details

See `TESTING.md` for comprehensive testing guide.
