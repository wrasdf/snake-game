## 1. Move Test Files

- [x] 1.1 Move `test-game.js` to `./tests/test-game.js`
- [x] 1.2 Move `test-results.json` to `./tests/test-results.json`
- [x] 1.3 Move `test-results/` directory to `./tests/test-results/`

## 2. Update Configuration

- [x] 2.1 Update `playwright.config.js` to reference `./tests/test-results.json`
- [x] 2.2 Update `playwright.config.js` to reference `./tests/test-results/` for output folder
- [x] 2.3 Verify any other config files reference moved paths correctly

## 3. Update Documentation

- [x] 3.1 Update README_TESTING.md to reference new test file locations
- [x] 3.2 Update TESTING.md to reference new test file locations
- [x] 3.3 Update TESTING_INDEX.md to reference new test file locations
- [x] 3.4 Update PLAYWRIGHT_SETUP.md to reference new test file locations

## 4. Testing and Verification

- [x] 4.1 Run Playwright tests to ensure they pass with new file structure
- [x] 4.2 Verify test results are generated in new location
- [x] 4.3 Verify HTML reports are generated in new location
- [x] 4.4 Commit changes to git with clear commit message
