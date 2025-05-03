const { loadConfiguration, loadSupport, runCucumber } = require('@cucumber/cucumber/api');
const logger = require('../../utils/logger.js');

(async function runCucumberTests() {
  const configFile = './cucumber.js';
  try {
    // Load the Cucumber configuration from cucumber.js
    const { runConfiguration } = await loadConfiguration({
      file: configFile,
    });

    logger.info('Loaded configuration:', runConfiguration);

    // Load support code (step definitions, hooks, etc.)
    const support = await loadSupport(runConfiguration);
    // Run the Cucumber tests with the loaded configuration and support
    const result = await runCucumber({ ...runConfiguration, support });

    // Handle the test result
    if (result.success) {
      logger.info('Cucumber tests passed successfully!');
    } else {
      logger.error('Cucumber tests failed.');
    }

  } catch (error) {
    logger.error('Error during Cucumber execution:', error);
  }
})();