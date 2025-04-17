const { chromium } = require('playwright');
const DashboardPage = require('../../../POM/dashboardPage');
const LaunchesPage = require('../../../POM/launchesPage');
const LogInPage = require('../../../POM/logInPage');
const path = require('path');
const logger = require('../../utils/logger');
const { expect } = require('@playwright/test');

//base_url_logic
require('dotenv').config();
const TEST_ENV = process.env.TEST_ENV;
const baseURL = TEST_ENV === 'prod' ? process.env.BASE_URL_PROD : process.env.BASE_URL_LOCAL;
global.baseURL = baseURL;

const authFile = path.join(__dirname, '../../../tests/testData/.auth/user.json');

module.exports = {
  mochaHooks: {

    beforeAll: async function () {
      // Only used to generate and save storage state once
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(`${baseURL}/ui/#login`);
      const logInPage = new LogInPage(page);
      const dashboardPage = new DashboardPage(page);
      await logInPage.loginInput.fill(process.env.USER_EMAIL);
      await logInPage.passwordInInput.fill(process.env.USER_PASSWORD);
      await logInPage.logInButton.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(7000);
      await expect(dashboardPage.signInToastMessage).toBeVisible();
      await context.storageState({ path: authFile });
      logger.info('Auth state saved for use in isolated tests');
      await browser.close();
    },

    beforeEach: async function () {
      // 1. Launch a new browser
      const browser = await chromium.launch({ headless: false });

      // 2. Use existing auth file to skip login
      const context = await browser.newContext({ storageState: authFile });
      const page = await context.newPage();
      await page.goto(`${baseURL}/ui/#default_personal/dashboard`, { waitUntil: 'networkidle' });

      // 4. Set globals
      global.browser = browser;
      global.page = page;
      global.pageFactory = {
        dashboardPage: new DashboardPage(page),
        launchesPage: new LaunchesPage(page),
        logInPage: new LogInPage(page),
      };
    },

    afterEach: async function () {
      if (global.browser) {
        await global.browser.close();
        global.browser = null;
        global.page = null;
        global.pageFactory = null;
      }
    },
  }
};
