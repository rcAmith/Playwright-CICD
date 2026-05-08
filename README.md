# E-Commerce Playwright

Playwright end-to-end tests for the Automation Exercise registration and login flows.

## Tech Stack

- TypeScript
- Playwright Test
- Page Object Model
- Allure reports
- GitHub Actions

## Project Structure

```text
src/
  config/          Shared test configuration and environment defaults
  pages/           Page objects and reusable page actions
  tests/           Playwright test specs
.github/workflows/ CI pipeline
```

## Requirements

- Node.js LTS
- npm
- Java 17 or newer for generating/opening Allure reports locally

This project uses `package-lock.json` and npm. Use npm commands for consistent local and CI installs.

## Setup

```bash
npm ci
npm run install:browsers
```

## Environment Variables

Defaults are defined in `src/config/testConfig.ts`. Use `.env.example` as a reference for local values, then set variables in your terminal or CI settings.

Useful variables:

- `BASE_URL`: application URL, defaults to `https://www.automationexercise.com`
- `HEADLESS`: `true` or `false`, defaults to `true`
- `VIDEO`: local video mode, defaults to `off`; CI uses `retain-on-failure`
- `WORKERS`: number of parallel workers, defaults to `3` locally and `1` in CI
- `RETRIES`: retry count, defaults to `0` locally and `1` in CI
- `SLOW_MO`: Playwright launch slow motion in milliseconds
- `LOGIN_EMAIL`, `LOGIN_PASSWORD`, `LOGIN_USER_NAME`: valid login test account
- `INVALID_LOGIN_EMAIL`: invalid login test email

PowerShell example:

```powershell
$env:HEADLESS="false"
$env:LOGIN_EMAIL="your-valid-test-user@example.com"
$env:LOGIN_PASSWORD="your-test-password"
npm run test:headed
```

## Run Tests Locally

```bash
npm test
```

Helpful scripts:

```bash
npm run test:headed
npm run test:all
npm run test:debug
npm run test:ui
npm run typecheck
```

## Playwright Report

After a test run, open the Playwright HTML report:

```bash
npm run report
```

## Allure Report

All Playwright runs now write Allure result files to `allure-results/`.

Generate and open the local Allure report:

```bash
npm run allure:clean
npm test
npm run allure:generate
npm run allure:open
```

For a quick generated temporary report:

```bash
npm run allure:serve
```

If Allure commands fail locally, install Java 17+ and make sure `java` is available in your terminal.

## CI Pipeline

The GitHub Actions workflow runs on:

- every push
- every pull request
- manual `workflow_dispatch`

The pipeline:

- checks out the repository
- installs Node.js with npm caching
- installs Java for Allure
- caches Playwright browsers
- runs `npm ci`
- installs Playwright browsers with system dependencies
- runs TypeScript checks
- runs Chromium tests headlessly
- generates Playwright, JUnit, and Allure reports
- uploads `reports/`, `test-results/`, `allure-results/`, and the generated Allure report as artifacts
- keeps traces, screenshots, and videos for failed CI tests

Download the `allure-report` artifact from a workflow run to view the CI Allure report.
