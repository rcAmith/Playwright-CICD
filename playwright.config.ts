import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './src/config/testConfig';

export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  workers: testConfig.workers,
  retries: testConfig.retries,
  forbidOnly: testConfig.isCI,
  outputDir: 'test-results',

  use: {
    baseURL: testConfig.baseURL,
    headless: testConfig.headless,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: testConfig.video,
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    launchOptions: {
      slowMo: testConfig.slowMo
    }
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results', detail: false, suiteTitle: true }]
  ],

  projects: [
    {
      name: 'ui-chromium',
      testDir: './src/tests',
      testMatch: ['**/login.spec.ts', '**/register.spec.ts'],
      use: {
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'ui-firefox',
      testDir: './src/tests',
      testMatch: ['**/login.spec.ts', '**/register.spec.ts'],
      use: {
        ...devices['Desktop Firefox']
      }
    },
    {
      name: 'ui-webkit',
      testDir: './src/tests',
      testMatch: ['**/login.spec.ts', '**/register.spec.ts'],
      use: {
        ...devices['Desktop Safari']
      }
    },
    {
      name: 'api',
      testDir: './src/tests/api',
      use: {}
    }
  ]
});
