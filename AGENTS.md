# AI Assistant Instructions

## Project Context

This is a TypeScript Playwright automation framework for the Automation Exercise e-commerce site. It contains UI tests using Page Object Model classes and API tests using Playwright request fixtures.

## Important Commands

- `npm ci`
- `npm run typecheck`
- `npm test`
- `npm run test:api`
- `npm run test:ui:chromium`
- `npm run test:ui`
- `npm run test:smoke`
- `npm run ci:pr`
- `npm run report`
- `npm run allure:generate`

## Architecture Conventions

- UI specs live under `src/tests/ui/` and use `*.ui.spec.ts`.
- API specs live under `src/tests/api/` and use `*.api.spec.ts`.
- Page objects live under `src/pages/` and use lowercase kebab names like `login.page.ts`.
- Test data builders live under `src/test-data/`.
- API payload helpers live under `src/utils/`.
- Keep the existing fixture-based architecture unless a change is explicitly requested.

## Locator Strategy

- Prefer stable `data-qa` selectors when available.
- Prefer Playwright role, label, placeholder, and text locators over brittle CSS.
- Do not add fixed sleeps. Use Playwright auto-waiting, locator assertions, or explicit state checks.
- Keep locators as readonly fields or getters. Avoid assigning locators inside action methods.

## Test Data And Cleanup

- Use typed factories for generated users/accounts.
- Do not commit real credentials.
- Account-creating tests must clean up with `try/finally`.
- Keep seeded/shared account assumptions obvious in test data files or CI secrets.

## Assertion And Reporting Rules

- Prefer precise assertions over broad allowed status lists.
- Use `test.step()` for multi-step workflows.
- Keep assertions in specs unless a page method represents a reusable page invariant.
- Preserve screenshots, traces, and videos for failures.

## CI Expectations

- PR checks should stay fast: typecheck, API tests, and Chromium UI tests.
- Full browser regression belongs on main, manual dispatch, or nightly schedule.
- Artifact names should identify the job or browser group.
- Keep workflow changes simple and readable.

## Editing Rules

- Do not edit generated folders such as `reports/`, `test-results/`, `allure-results/`, `allure-report/`, `node_modules/`, or `dist/`.
- Keep changes small and compatible with existing scripts.
- Update README commands when scripts or CI behavior change.
