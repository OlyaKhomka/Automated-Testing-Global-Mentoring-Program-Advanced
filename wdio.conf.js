const hooks = require('./core/configuration/hooks/wdioHooks');
exports.config = {

    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',  // Specifies that tests will run locally
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './tests/wdio/**.e2e.js' // Corrected file path to use "./"
    ],
    exclude: [],
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 10, // Max number of browser instances to run in parallel
    capabilities: [{
        browserName: 'chrome', // Browser to use
        'goog:chromeOptions': {
            args: ['--disable-gpu'], // Headless mode for Chrome
        }
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'error', // Set the verbosity of logs (adjust as needed)
    bail: 0, // Don't stop the test run after the first failure
    waitforTimeout: 10000, // Default timeout for waitFor commands
    connectionRetryTimeout: 120000, // Timeout for WebDriver sessions
    connectionRetryCount: 3, // Retry count for failed requests

    //
    // Test runner services
    services: [], // Ensure the Chromedriver service is enabled

    //
    // ====================
    // Framework Configurations
    // ====================
    framework: 'mocha', // The test framework to use
    reporters: [
        ['allure', {
            outputDir: './tests-results/allure-results', // Directory where allure results will be stored
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false, // This automatically attaches screenshots
        }]
    ],
    mochaOpts: {
        ui: 'bdd', // Mocha's test interface: BDD (Behavior Driven Development)
        timeout: 60000 // Test timeout in milliseconds
    },

    before: hooks.before,
    beforeSuite: hooks.beforeSuite,
    beforeTest: hooks.beforeTest,
    afterTest: hooks.afterTest,
    afterSuite: hooks.afterSuite,
};