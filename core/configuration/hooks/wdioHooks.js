require('dotenv').config();
const { wdioLogin } = require('../helpers/loginHelperWdio');
const logger = require('../../utils/logger');
const registerCustomCommands = require('../../utils/wdioCommands');

module.exports = {

    before: function () {
        registerCustomCommands();
    },

    beforeSuite: async function () {
        try {
            logger.info('Log In in BeforeSuite');
            await wdioLogin();

        } catch (err) {
            logger.error(`Login Error: ${err.message}`);
            throw err;
        }
    },

    beforeTest: async function (test) {
        // try {
        //     logger.info(`CleanUp before test & token setup: ${test.title}`);

        //     await browser.deleteAllCookies();  к
        //     await browser.execute(() => localStorage.clear());
        //     await browser.execute(() => sessionStorage.clear());
        //     logger.info('Cookies, SessionStorage and LocalStorage have been cleaned');

        //     await browser.execute((token) => {
        //         localStorage.setItem('token', token);
        //     }, process.env.AUTH_TOKEN);


        // } catch (err) {
        //     logger.error(`Before Hook Error: ${err.message}`);
        //     throw err;
        // }
    },

    afterTest: async function (test, result) {
        if (!result.passed) {
            logger.error(`Test Error: ${test.title}`);
        } else {
            logger.info(`Success : ${test.title}`);
        }
    },

    afterSuite: async function (suite) {
        logger.info(`Suite "${suite.title}" is finished .`);
    },
};