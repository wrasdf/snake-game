## Context

The project has test-related files split between the root directory and the `./tests` directory. Currently at root: `test-game.js`, `test-results.json`, and `test-results/` directory. The main test specifications are in `./tests`. This scattered organization makes it unclear what constitutes the test infrastructure versus the application code.

## Goals / Non-Goals

**Goals:**
- Consolidate all test-related files into `./tests` directory
- Improve project organization and clarity
- Make it obvious that `./tests` is the complete test suite directory
- Preserve test results and history

**Non-Goals:**
- Changing test framework or configuration (Playwright settings remain the same)
- Refactoring test code logic
- Modifying test specifications or requirements

## Decisions

1. **Move all test artifacts into `./tests`**
   - Rationale: Centralizing test infrastructure in one directory is clearer and follows common project conventions.
   - Alternative: Keep test-results at root - rejected because it scatters related files.

2. **Update Playwright config to reference test results in new location**
   - Rationale: Playwright config at root needs to know where test results are located.
   - Alternative: Move playwright.config.js to ./tests - rejected because Playwright looks for config at root level.

3. **Use simple file/directory moves, not restructuring**
   - Rationale: Minimal changes reduce risk and maintain compatibility.
   - Alternative: Reorganize test structure - rejected as out of scope.

## Risks / Trade-offs

**Risk: Breaking CI/CD pipelines that reference test result paths** → Mitigated by updating all configuration files that reference the old paths.

**Risk: Test reports and historical results may be referenced in documentation** → Mitigated by ensuring all references are updated in docs and comments.

**Trade-off: More nested directory structure** → Offset by significantly improved organization and clarity of project layout.

## Migration Plan

1. Move `test-game.js` to `./tests/test-game.js`
2. Move `test-results.json` to `./tests/test-results.json`
3. Move `test-results/` directory to `./tests/test-results/`
4. Update `playwright.config.js` to reference `./tests/test-results` and `./tests/test-results.json`
5. Update documentation files that reference test file locations
6. Run tests to verify everything works
