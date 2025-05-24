
const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const DashboardPage = require('../../../POM/dashboardPage');
const LaunchesPage = require('../../../POM/launchesPage');
const LogInPage = require('../../../POM//logInPage');
const ElementHelper = require('./elementsHelper');
const { baseURL, authFile } = require('../../../core/configuration/helpers/loginHelper');
require('dotenv').config(); // Load from .env file if needed

class CustomWorld extends World {
  constructor(options) {
    super(options); // Call the original World constructor
    this.page = null;
    this.context = null;
    this.browser = null;
    this.pageFactory = null;
    this.data = {}; // Object to hold all alias values
    this.baseURL = baseURL;
  }

  async initBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext({ storageState: authFile });
    this.page = await this.context.newPage();

    this.pageFactory = {
      dashboardPage: new DashboardPage(this.page),
      launchesPage: new LaunchesPage(this.page),
      logInPage: new LogInPage(this.page),
    };
    this.elementHelper = new ElementHelper(this.pageFactory);
  };

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
      this.pageFactory = null;
    }
  };

  // Custom method to remember a value with an alias
  remember(key, value) {
    this.data[key] = value;
  }

  // Custom method to recall a value by alias
  recall(key) {
    return this.data[key];
  }
}

setWorldConstructor(CustomWorld);