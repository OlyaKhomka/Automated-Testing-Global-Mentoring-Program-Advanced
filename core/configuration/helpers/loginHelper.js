const { chromium } = require('playwright');
const path = require('path');
const LogInPage = require('../../../POM/logInPage');
const logger = require('../../utils/logger');

require('dotenv').config();

const authFile = path.join(__dirname, '../../../tests/testData/.auth/user.json');

const TEST_ENV = process.env.TEST_ENV;
const baseURL = TEST_ENV === 'prod' ? process.env.BASE_URL_PROD : process.env.BASE_URL_LOCAL;

async function loginAndSaveAuth() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const logInPage = new LogInPage(page);

  await page.goto(`${baseURL}/ui/#login`);
  await logInPage.loginInput.fill(process.env.USER_EMAIL);
  await logInPage.passwordInInput.fill(process.env.USER_PASSWORD);
  await logInPage.logInButton.click();

  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(7000);

  await context.storageState({ path: authFile });
  logger.info('Storage state saved');

  await browser.close();
}

module.exports = {
  loginAndSaveAuth,
  baseURL,
  authFile,
};