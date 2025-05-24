const {BeforeAll, Before, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { loginAndSaveAuth } = require('../helpers/loginHelper');
const logger = require('../../utils/logger');

setDefaultTimeout(60 * 1000);

BeforeAll( async function() {
  logger.info('Perform Login');
  await loginAndSaveAuth();
}),

Before(async function () {
  logger.info('Initialize Browser');
  await this.initBrowser();

}),

After(async function() {
logger.info('Close Browser');
await this.closeBrowser();
});