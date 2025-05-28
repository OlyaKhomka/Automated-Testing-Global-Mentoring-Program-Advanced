import { test as base } from '@playwright/test';
const { APIRequestContext } = require('@playwright/test');
const { APIClient } = require('./playwrightClient');
const { DashboardAPI } = require('./dashboardApi');
const fs = require('fs');
const path = require('path');
const validateSchema = require('../api/apiHelpers/schemaValidator');

const projectName = process.env.DASHBOARD_NAME || 'default_project';

//Fixture to create DashboardAPi class
exports.test = base.extend({
  dashboardApi: async ({ request }, use) => {
    const apiClient = new APIClient(request);

    const tokenPath = path.resolve('core/api/apiHelpers/apiTestData/token.json');
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    apiClient.setAuthToken(tokenData.token);

    const dashboardApi = new DashboardAPI(apiClient, projectName);
    await use(dashboardApi);
  },

  //Fixture to make tests use SchemaValidator
  validateSchema: async ({ }, use) => {
    await use(validateSchema);
  }
});