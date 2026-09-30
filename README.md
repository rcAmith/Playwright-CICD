# E-Commerce Playwright

TypeScript Playwright automation for the Automation Exercise e-commerce site. The framework covers browser UI flows with Page Object Model classes and API coverage with Playwright request fixtures.

## Tech Stack

- TypeScript
- Playwright Test
- Page Object Model
- Playwright API testing
- HTML, JUnit, and Allure reports
- GitHub Actions
- npm

## Architecture

```text
src/
  config/          Runtime config and environment validation
  fixtures/        Playwright fixtures for page objects and API services
  pages/           UI Page Object Model classes
  services/        API service wrapper
  test-data/       Typed test data factories and login user data
  tests/ui/        UI specs named *.ui.spec.ts
  tests/api/       API specs named *.api.spec.ts
  utils/           API payload helpers
.github/workflows/ GitHub Actions CI pipeline
```

## Requirements

- Node.js LTS
- npm
- Java 17 or newer for generating/opening Allure reports locally

Install dependencies and browsers:

```bash
npm ci
npm run install:browsers
```

For a faster Chromium-only setup:

```bash
npm run install:browsers:chromium
```

## Environment Variables

Defaults are defined in `src/config/testConfig.ts`. Use `.env.example` as a reference, then set values in your shell or CI secrets.

Important variables:

- `BASE_URL`: defaults to `https://www.automationexercise.com`
- `HEADLESS`: defaults to `true`
- `VIDEO`: defaults to `off` locally and `retain-on-failure` in CI
- `WORKERS`: defaults to `3` locally and `1` in CI
- `RETRIES`: defaults to `0` locally and `1` in CI
- `SLOW_MO`: Playwright launch slow motion in milliseconds
- `LOGIN_EMAIL`, `LOGIN_PASSWORD`, `LOGIN_USER_NAME`: required for UI login tests

Never commit real credentials. Store real login values in local environment variables or GitHub Actions secrets.

## Common Commands

```bash
npm test                    # Chromium UI tests
npm run test:ui:chromium    # Chromium UI tests explicitly
npm run test:api            # API tests only
npm run test:ui             # Chromium, Firefox, and WebKit UI tests
npm run test:smoke          # Fast smoke subset
npm run test:regression     # Regression-tagged tests
npm run ci:pr               # Local PR-style check
npm run ci:full             # Local full check
npm run test:headed         # Headed Chromium UI
npm run test:debug          # Playwright debug mode
npm run test:ui-ui          # Playwright UI mode
npm run typecheck           # TypeScript validation
```

## Reports And Debugging

Playwright writes reports and failure artifacts to ignored output folders:

- `reports/playwright-report/`: HTML report
- `reports/junit-results.xml`: JUnit report
- `allure-results/`: raw Allure results
- `reports/allure-report/`: generated Allure report
- `test-results/`: traces, screenshots, and videos

Open the Playwright report:

```bash
npm run report
```

Generate and open Allure locally:

```bash
npm run allure:clean
npm test
npm run allure:generate
npm run allure:open
```

Debugging tips:

- Use `npm run test:headed` to watch the browser.
- Use `npm run test:debug` to inspect locators and actions.
- Use traces from `test-results/` or CI artifacts for failed tests.
- Use `test.step()` output in reports to follow API workflows.

## Test Organization

- UI specs live in `src/tests/ui/` and use `*.ui.spec.ts`.
- API specs use `*.api.spec.ts`.
- Smoke tests include `@smoke`.
- Regression tests include `@regression`.
- Platform tags use `@ui` and `@api`.

New account-creating tests should clean up resources with `try/finally`.

## CI Strategy

GitHub Actions runs:

- Pull requests: TypeScript check, API tests, and Chromium UI tests.
- `main`/`master`, manual dispatch, and nightly schedule: TypeScript check, API tests, and full browser UI regression.

The workflow:

- cancels stale runs for the same branch or PR
- uses npm caching
- caches Playwright browsers
- installs only Chromium for PR UI tests
- installs all browsers for full UI regression
- uploads job-specific Playwright and Allure artifacts
- retains failure screenshots, traces, and videos

Required CI secrets for UI tests:

- `LOGIN_EMAIL`
- `LOGIN_PASSWORD`
- `LOGIN_USER_NAME`

Optional CI secret:

- `BASE_URL`
