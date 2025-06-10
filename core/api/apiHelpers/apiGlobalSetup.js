// core/api/apiHelpers/apiGlobalSetup.js
const { test } = require('@playwright/test');
const { loginAndGetToken } = require('./apiLoginHelper');
const logger = require('../../utils/logger');

test('setup: login and assign token to process.env', async () => {
  logger.info('>>> API setup started');
  const token = await loginAndGetToken();

  // Assign token to environment variable in memory
  process.env.TOKEN = token;

  logger.info('>>> Token saved to process.env.TOKEN');
});