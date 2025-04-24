const { chromium } = require('playwright');
const DashboardPage = require('../../../POM/dashboardPage');
const LaunchesPage = require('../../../POM/launchesPage');
const LogInPage = require('../../../POM/logInPage');
const { baseURL, authFile } = require('../helpers/loginHelper');

module.exports = {
  mochaHooks: {

    beforeEach: async function () {
      // Launch a new browser
      this.browser = await chromium.launch({ headless: false });

      // Use existing auth file 
      const context = await this.browser.newContext({ storageState: authFile });

      this.page = await context.newPage();
      await this.page.goto(`${baseURL}/ui/#${process.env.DASHBOARD_NAME}/dashboard`, { waitUntil: 'networkidle' });

      // Set up a page factory tied to this.page
      this.pageFactory = {
        dashboardPage: new DashboardPage(this.page),
        launchesPage: new LaunchesPage(this.page),
        logInPage: new LogInPage(this.page),
      };
    },

    afterEach: async function () {
      // Close browser and clean up
      if (this.browser) {
        await this.browser.close();
        this.browser = null;
        this.page = null;
        this.pageFactory = null;
      }
    },
  },
};
