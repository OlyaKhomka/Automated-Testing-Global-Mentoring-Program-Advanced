// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const TEST_ENV = process.env.TEST_ENV || 'local'; // Default to 'local'
const baseURL = TEST_ENV === 'prod' ? process.env.BASE_URL_PROD : process.env.BASE_URL_LOCAL;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testIgnore:'**/*.spec.js', // Ignore mocha-style test files
 
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,
  //  baseURL:'https://demo.reportportal.io',
    //baseURL: 'http://localhost:8080/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.js/ },
    
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        // storageState: './testData/.auth/user.json'
        storageState: path.resolve(__dirname, 'tests/testData/.auth/user.json')
       },
       dependencies: ['setup']
    },

    {
      name: 'api-setup',
      testDir: './core/api/apiHelpers',
      testMatch: ['apiGlobalSetup.js'], // укажи имя своего setup-файла точно
      fullyParallel: false,
      retries: 0,
      use: {
        browserName: undefined,
      },
    },
    {
      name: 'api-tests',
      testDir: './tests/api',
      testMatch: ['**/*.js', '!apiGlobalSetup.js'], // исключаем setup
      retries: 0,
      use: {
        browserName: undefined,
        baseURL: process.env.BASE_URL_PROD || 'http://localhost:3000',
        trace: 'off',
      },
      dependencies: ['api-setup'],
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

