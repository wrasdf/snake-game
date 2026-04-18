## Why

The project currently has test-related files scattered at the root level (`test-game.js`, `test-results.json`, `test-results/`), while the main test suite is in a `./tests` directory. Consolidating all test-related files into `./tests` will improve project organization and make it clear what is part of the test infrastructure versus the main application.

## What Changes

- Move `test-game.js` into `./tests/`
- Move `test-results.json` into `./tests/`
- Move `test-results/` directory into `./tests/`
- Update any configuration or documentation references to point to new locations

## Capabilities

### New Capabilities
- `organized-test-structure`: Test-related files consolidated into a dedicated `./tests` directory for improved project organization

### Modified Capabilities
<!-- No existing capabilities require specification changes -->

## Impact

- Project structure: Root directory becomes cleaner with test infrastructure moved to `./tests`
- Configuration: Playwright config may need updates to reference test results in new location
- Documentation: References to test file locations in docs and comments should be updated
- No impact on test functionality or API
