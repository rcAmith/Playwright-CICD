import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

export default defineConfig({
  workers: isCI ? 1 : 3, // Keep CI stable, keep local runs parallel
  
  // Directory where tests are located
  testDir: './src/tests',
  
  // Global timeout for each test
  timeout: 60 * 1000,
  retries: isCI ? 1 : 0,
  forbidOnly: isCI,
  outputDir: 'test-results',

  // Global configuration for all projects
  use: {
    baseURL: "https://www.automationexercise.com",
    headless: isCI,
    video: isCI ? 'retain-on-failure' : 'on',  // Record video during tests
    trace: isCI ? 'retain-on-failure' : 'off', // Trace generation for debugging
    screenshot: 'only-on-failure',  // Take screenshot only on failure
    launchOptions: {
      headless: isCI,
      slowMo: isCI ? 0 : 50  // Slow down the tests to make debugging easier
    }
  },

  // Reporter configuration (moved out of projects)
  reporter: [
      ['list'],
      ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
      ['junit', { outputFile: 'reports/junit-results.xml' }],
  ],

  // Static Projects configuration for each browser
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],  // Use the device configuration specific to Chromium
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],  // Use the device configuration specific to Firefox
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],  // Use the device configuration specific to WebKit (Safari)
      },
    },
  ],
});
