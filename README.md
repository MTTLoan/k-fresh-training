# Playwright Test Suite

A small Playwright test project configured to run UI tests under `tests/ui` and generate an HTML report.

## Project Overview

This repository contains end-to-end UI tests built with Playwright. The test runner is configured in `playwright.config.ts` and the test files are located under `tests/ui`.

## Prerequisites

- Node.js 18 or later
- npm
- Git (optional)

## Install Dependencies

```bash
npm install
```

## Run Tests

Run the full Playwright test suite:

```bash
npm test
```

### Run tests for a specific environment

The repository supports environment-specific test runs by setting the `TEST_ENV` variable:

```bash
npm run test:dev
npm run test:qa
npm run test:uat
npm run test:stg
npm run test:prod
```

These scripts use `cross-env` to set `TEST_ENV` for the Playwright process.

## Configuration

The Playwright configuration is located in `playwright.config.ts`:

- `testDir`: `./tests`
- `reporter`: `html`
- `timeout`: 30 seconds per test
- `expect.timeout`: 5 seconds
- `retries`: 1
- Browser: `chromium`
- `headless`: `false`
- `screenshot`: `only-on-failure`
- `trace`: `retain-on-failure`

## Folder Structure

- `tests/ui/` - Playwright test specifications
- `documents/` - supporting documentation and test cases
- `playwright-report/` - generated HTML report output
- `test-results/` - persisted test result artifacts

## Viewing Test Reports

After running tests, open the report at:

```bash
npx playwright show-report
```

Or open `playwright-report/index.html` in your browser.

## Notes

- The project has `dotenv` installed, so environment variables can be loaded from a `.env` file if needed.
- Update `playwright.config.ts` if you want additional browsers, test retries, or different reporter settings.
