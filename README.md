# Playwright Automation for Automation Exercise

## Overview

This repository contains a TypeScript-based Playwright automation framework for testing the public Automation Exercise website. It exercises both browser UI workflows and REST API endpoints against the live demo app and validates expected responses, account lifecycle behavior, product and brand data, and login flows.

The project uses a page object model for browser tests, request-based fixtures for API tests, and reusable service helpers for account/auth flows. The framework also integrates with Playwright HTML reporting, JUnit, and Allure when run locally or in CI.

## Tech Stack

- TypeScript
- Playwright Test
- Node.js 20+
- npm
- Allure Commandline
- Docker
- Jenkins
- GitHub Actions

## Project Structure

```text
.
├── .github/workflows/         GitHub Actions CI workflow
├── src/
│   ├── config/                Environment and runtime configuration
│   │   ├── envValidation.ts
│   │   └── testConfig.ts
│   ├── fixtures/              Playwright fixtures for UI and API tests
│   │   ├── apiFixtures.ts
│   │   └── pageFixtures.ts
│   ├── pages/                 Page Object Model classes
│   ├── services/              API-layer service wrappers
│   ├── test-data/             Generated user/account data and test inputs
│   ├── tests/
│   │   ├── api/               API specs (*.api.spec.ts)
│   │   └── ui/                UI specs (*.ui.spec.ts)
│   └── utils/                API payload builders and helpers
├── reports/                  Playwright and Allure output folders
├── test-results/             Playwright artifact directory
├── Dockerfile                Docker image for CI/local execution
├── Jenkinsfile               Jenkins pipeline definition
├── playwright.config.ts      Playwright configuration and reporters
├── package.json              NPM scripts and dependencies
├── tsconfig.json             TypeScript config
├── .env.example              Example environment values
└── README.md
```

## Features

### Implemented

- UI automation for login, logout, signup, invalid login, invalid signup, product search, and contact form flows
- API automation for account creation, login verification, product listing, brand listing, search, and lifecycle workflows
- Shared Playwright fixtures for page and API usage
- Reusable account/auth service wrappers for API interactions
- Test data factories for generated test emails and signup payloads
- Environment validation for required UI login secrets
- Multiple report outputs: Playwright HTML, JUnit, and Allure
- CI pipelines via GitHub Actions and Jenkins
- Dockerized execution for CI-style pipeline runs

### Configured but not broad feature coverage

- Cross-browser UI execution is configured for Chromium, Firefox, and WebKit
- Headless and video/trace behavior is configured through environment values
- Docker execution is supported and used by Jenkins

## UI Automation

The UI suite is organized under `src/tests/ui` and currently covers:

- login with valid credentials
- logout flow
- signup/register with valid data
- invalid login flow
- invalid signup flow using an existing email
- product search by keyword
- contact us form submission

Browser projects in `playwright.config.ts`:

- `ui-chromium`
- `ui-firefox`
- `ui-webkit`
- `api`

The page object model is implemented in classes under `src/pages`, including `login.page.ts`, `product.page.ts`, `signup.page.ts`, and related pages. The UI fixture in `src/fixtures/pageFixtures.ts` provides page-specific objects automatically to specs.

Current Playwright behavior:

- `outputDir` is `test-results`
- screenshots are enabled only on failure
- traces are retained on failure
- video is configured from `testConfig.video` and defaults to `off` locally and `retain-on-failure` in CI
- `workers` is currently set to `1` in the config file
- retries are controlled by `testConfig.retries` and default to `0` locally, `1` in CI

Tags used in UI specs include `@smoke`, `@ui`, and `@regression`.

## API Automation

The API suite is organized under `src/tests/api` and uses Playwright's `request` fixture via `src/fixtures/apiFixtures.ts`.

Current API coverage includes:

- account creation
- duplicate account rejection
- user lookup by email
- missing email validation
- account update
- account deletion
- login verification
- product listing
- brand listing
- product search
- unsupported-method validation for endpoints that should reject non-allowed HTTP verbs

Core API service wrappers:

- `ApiService` handles request execution and status validation
- `AccountService` wraps account CRUD calls
- `AuthService` wraps login verification calls
- `apiHelpers.ts` builds request payloads for account, search, update, and delete operations

The project validates both:

- HTTP status codes
- API response fields such as `responseCode`, `message`, and expected payload structure

Account creation tests clean up created users in `try/finally` blocks when needed.

## Framework Architecture

### Page Object Model

The UI layer follows a page-object pattern with page classes in `src/pages`. Each page is responsible for its own locators and reusable actions, while tests remain focused on the scenario and assertions.

### Fixtures

- `pageFixtures.ts` adds reusable page objects to specs
- `apiFixtures.ts` adds API helper/service objects to specs

This keeps test code readable and reduces repeated setup logic.

### Reusable Utilities

- `src/utils/apiHelpers.ts` builds payloads for create/update/delete/search/login requests
- `src/config/envValidation.ts` validates required environment variables
- `src/config/testConfig.ts` centralizes runtime behavior for URL, retries, video, and browser settings

### Test Data Management

- `src/test-data/users.ts` contains default login and invalid-login sample values
- `src/test-data/accountFactory.ts` builds generated signup/account objects for UI tests

### Environment Handling

The framework loads environment variables from `.env` using `dotenv` and validates required values before UI login tests run.

Key values used by the project:

- `BASE_URL` (default: `https://www.automationexercise.com`)
- `HEADLESS`
- `CI`
- `RETRIES`
- `VIDEO`
- `WORKERS`
- `LOGIN_EMAIL`
- `LOGIN_PASSWORD`
- `LOGIN_USER_NAME`

No production credentials should be committed to source control; the project expects them to be supplied via a local `.env` file or CI secrets.

## Configuration

### Playwright

The project config is in `playwright.config.ts`.

Configured reporters:

- `list`
- HTML: `reports/playwright-report`
- JUnit: `reports/junit/junit-results.xml`
- Allure: `reports/allure-results`

Configured test projects:

- UI browser specs in `src/tests/ui`
- API specs in `src/tests/api`

## Installation

Requirements:

- Node.js 20 or newer
- npm
- Java 17+ for Allure CLI generation locally

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

Chromium-only install:

```bash
npx playwright install --with-deps chromium
```

## Running Tests

Common commands from `package.json`:

```bash
npm test
npm run test:ui:chromium
npm run test:headed
npm run test:ui
npm run test:api
npm run test:smoke
npm run test:regression
npm run typecheck
npm run ci:pr
npm run ci:full
npm run ci:allure
```

Descriptions:

- `npm test` runs the Chromium UI project
- `npm run test:ui` runs Chromium + Firefox + WebKit UI projects
- `npm run test:api` runs the API project
- `npm run ci:pr` runs typecheck + API tests + Chromium UI tests
- `npm run ci:full` runs typecheck + API tests + all UI browsers
- `npm run ci:allure` is a failure-safe pipeline wrapper that runs all stages and generates Allure output even if one earlier step fails

## Reporting

The project writes multiple artifact sets:

- Playwright HTML report: `reports/playwright-report`
- JUnit XML: `reports/junit/junit-results.xml`
- Raw Allure results: `reports/allure-results`
- Generated Allure report: `reports/allure-report`
- Playwright artifacts: `test-results`

Useful commands:

```bash
npm run report
npm run allure:generate
npm run allure:open
npm run allure:clean
```

## CI/CD

### GitHub Actions

The workflow is defined in `.github/workflows/playwright.yml`.

Triggers:

- `push` to `main` or `master`
- `pull_request`
- `workflow_dispatch`

Jobs:

- `typecheck`
- `api`
- `ui-chromium` for pull requests
- `ui-all-browsers` for non-PR runs

The workflow:

- installs Node and project dependencies
- installs browser dependencies as needed
- validates required UI secrets before browser runs
- uploads Playwright and Allure artifacts from each job
- runs report generation when the job is not successful

### Jenkins

The project also contains a Jenkins pipeline in `Jenkinsfile`.

It supports:

- Docker-based execution via `DOCKER_RUN` parameter
- local execution on an agent when Docker is disabled
- typecheck + API + UI test execution in the same pipeline
- JUnit publishing and HTML report publishing
- artifact archiving for reports and test results

## Docker

The Docker image is defined in `Dockerfile`:

- base image: `mcr.microsoft.com/playwright:v1.63.0-noble`
- installs Java for Allure CLI generation
- runs `npm ci`
- copies the repository source into `/app`
- creates the report and artifact directories
- defaults to `npm test`

Example local build:

```bash
docker build -t playwright-e2e-tests:local .
```

Example local run:

```bash
docker run --rm \
  --env-file .env \
  -e CI="true" \
  -e HEADLESS="true" \
  -v "$PWD/reports:/app/reports" \
  -v "$PWD/test-results:/app/test-results" \
  playwright-e2e-tests:local \
  sh -lc 'npm run ci:allure'
```

This project currently works in the Docker runtime used by the repository; local host Node versions below 20 will not satisfy Playwright 1.63 requirements.

## Troubleshooting

- If Playwright refuses to start locally, confirm the host is using Node.js 20 or newer.
- If UI tests fail because env vars are missing, ensure `LOGIN_EMAIL`, `LOGIN_PASSWORD`, and `LOGIN_USER_NAME` are set.
- If Allure generation reports that raw results are missing, make sure the Playwright reporter is configured to write to `reports/allure-results` and that the tests were run with the `allure-playwright` reporter enabled.
- If report folders are stale, run:

```bash
npm run allure:clean
```

## Future Improvements

Potential follow-up improvements for this repository include:

- expanding UI coverage beyond the current smoke/regression set
- refining parallelization strategy for UI execution in CI
- adding more test-data factories and reusable validation helpers
- improving folder cleanup / artifact retention policies
- adding a dedicated `.dockerignore` if the image context grows larger
