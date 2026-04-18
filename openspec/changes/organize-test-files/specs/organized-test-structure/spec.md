## ADDED Requirements

### Requirement: Test files organized in tests directory
The project SHALL maintain all test-related files in a dedicated `./tests` directory to improve project organization and clarity.

#### Scenario: Test artifacts in tests directory
- **WHEN** the project is deployed
- **THEN** `test-game.js`, `test-results.json`, and `test-results/` are located in `./tests/`

#### Scenario: Test infrastructure consolidated
- **WHEN** developers navigate the project
- **THEN** it is clear that `./tests` contains all test-related files and infrastructure

### Requirement: Playwright configuration updated for new test paths
Playwright configuration SHALL be updated to reference test results in their new location within `./tests`.

#### Scenario: Test results saved to new location
- **WHEN** tests run
- **THEN** test results are saved to `./tests/test-results.json` and `./tests/test-results/`

#### Scenario: Test reports accessible from new location
- **WHEN** Playwright test suite completes
- **THEN** HTML reports and JSON results are available in `./tests/test-results/`

### Requirement: All test functionality preserved after reorganization
The project SHALL maintain full test functionality after moving test files to the `./tests` directory.

#### Scenario: All tests pass with new file structure
- **WHEN** the test suite runs after file reorganization
- **THEN** all tests pass and produce the same results as before

#### Scenario: Test configuration works with moved files
- **WHEN** Playwright runs
- **THEN** it correctly finds all test specifications and generates reports in the new location
