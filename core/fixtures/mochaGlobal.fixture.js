const { loginAndSaveAuth } = require('../configuration/helpers/loginHelper');
const logger = require('../utils/logger');

async function mochaGlobalSetup() {
  logger.info("Running global setup...");
  await loginAndSaveAuth();
  logger.info("Authentication is complete.");
}

module.exports = {
  mochaGlobalSetup, 
};