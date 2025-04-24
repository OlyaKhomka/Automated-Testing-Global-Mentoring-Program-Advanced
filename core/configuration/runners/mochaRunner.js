//custom runner that handles both API & E2E Tests
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const mochaHooks = require('../hooks/mochaHooks.js');
const logger = require('../../utils/logger.js');
const { mochaGlobalSetup }= require('../../fixtures/mochaGlobal.fixture');

(async function runMochaTests() {

    const testDir = path.join(__dirname, '../../../tests/mocha');

    const mocha = new Mocha({
        timeout: 100000,
    });
    
     mocha.globalSetup(mochaGlobalSetup);
     mocha.rootHooks(mochaHooks.mochaHooks);
    try {
        // Read the directory and add each .js test file to Mocha. Can be converted into recursion function if there are any sub-folders
        fs.readdirSync(testDir).forEach(file => {
            const fullPath = path.join(testDir, file);
            if (file.endsWith('.js')) {
                mocha.addFile(fullPath); // Add the JS file to the Mocha test runner
            } else {
                logger.error(`${fullPath} is not a JS file`); // Log non-JS files
            }
        });
        // // mocha.grep(/tag/i); //Run tagged tests only: case-insensitive

        // Run the Mocha tests
        mocha.run(failures => {
            logger.error(`Number of tests failed: ${failures}`);
        });
    } catch (error) {
        logger.error("Error while running, there must be an issue with the runner", error);
        logger.error(error.message);
    }
})();
