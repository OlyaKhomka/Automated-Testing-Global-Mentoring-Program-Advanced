require('dotenv').config();
const PageFactory = require('../../../POM/pageFactory');
const logger = require('../../utils/logger');

const TEST_ENV = process.env.TEST_ENV;
const baseURL = TEST_ENV === 'prod' ? process.env.BASE_URL_PROD : process.env.BASE_URL_LOCAL;

async function wdioLogin() {
  const factory = new PageFactory(browser);
  pageFactory = factory.createPageObjects();

  await browser.url(`${baseURL}` + '/ui/#login');


  await pageFactory.logInPage.loginInput.setValue(process.env.USER_EMAIL);
  await pageFactory.logInPage.passwordInput.setValue(process.env.USER_PASSWORD);
  await pageFactory.logInPage.logInButton.click();

  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(process.env.DASHBOARD_NAME),
    { timeout: 10000, timeoutMsg: 'Login failed, dashboard not loaded' }
  );

  const token = await browser.execute(() => {
    return localStorage.getItem('token');
  });
  console.log(token);
  if (!token) {
    throw new Error('No auth token found in localStorage after login');
  }

  process.env.AUTH_TOKEN = token;
  logger.info(`Token is saved process.env: ${token}`);
}

module.exports = { wdioLogin };