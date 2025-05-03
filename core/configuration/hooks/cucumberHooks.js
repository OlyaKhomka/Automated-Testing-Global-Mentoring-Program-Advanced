const {BeforeAll, Before, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { loginAndSaveAuth } = require('../helpers/loginHelper');
const logger = require('../../utils/logger');

setDefaultTimeout(60 * 1000);

BeforeAll( async function() {
  logger.info('I am in BeforeALL');
  await loginAndSaveAuth();
}),

Before(async function () {
  logger.info('I am in Before');
  await this.initBrowser();

}),

After(async function() {
logger.info('I am in After');
await this.closeBrowser();
});