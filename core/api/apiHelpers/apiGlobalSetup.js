// core/api/apiHelpers/apiGlobalSetup.js
const { test } = require('@playwright/test');
const { loginAndGetToken } = require('./apiLoginHelper');
const fs = require('fs');
const path = require('path');
const logger = require('../../utils/logger');

test('setup: login and save token', async () => {
  logger.info('>>> API setup started');
  const token = await loginAndGetToken();
  const tokenPath = path.resolve(__dirname, './apiTestData/token.json');
  fs.writeFileSync(tokenPath, JSON.stringify({ token }));
});
