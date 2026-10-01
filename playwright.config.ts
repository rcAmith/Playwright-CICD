import { defineConfig, devices } from "@playwright/test";
import { testConfig } from "./src/config/testConfig";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export default defineConfig({
  testDir: "./src/tests",
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  workers:1,
  // workers: testConfig.workers,
  retries: testConfig.retries,
  forbidOnly: testConfig.isCI,
  outputDir: "test-results",

  use: {
    baseURL: testConfig.baseURL,
    headless: testConfig.headless,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: testConfig.video,
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,
    launchOptions: {
      slowMo: testConfig.slowMo,
    },
    testIdAttribute: "data-qa",
  },

reporter: [
    ["list"],
    // All reports grouped under a 'reports' folder
    ["html", { outputFolder: "reports/playwright-report", open: "never" }],
    ["junit", { outputFile: "reports/junit/junit-results.xml" }],
    [
      "allure-playwright",
      { resultsDir: "reports/allure-results", detail: false, suiteTitle: true },
    ],
  ],

projects: [
    {
      name: "ui-chromium",
      testDir: "./src/tests/ui", 
      testMatch: "*.ui.spec.ts",  
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "ui-firefox",
      testDir: "./src/tests/ui",
      testMatch: "*.ui.spec.ts",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "ui-webkit",
      testDir: "./src/tests/ui",
      testMatch: "*.ui.spec.ts",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "api",
      testDir: "./src/tests/api",
      testMatch: "*.api.spec.ts",
      use: {},
    },
  ],
});
