import { test as base } from '@playwright/test';
const { APIClient } = require('./playwrightClient');
const { DashboardAPI } = require('./dashboardApi');
const validateSchema = require('../api/apiHelpers/schemaValidator');

const projectName = process.env.DASHBOARD_NAME || 'default_project';

// Fixture to create DashboardAPI class
exports.test = base.extend({
  dashboardApi: async ({ request }, use) => {
    const apiClient = new APIClient(request);

    const token = process.env.TOKEN;
    if (!token) {
      throw new Error('process.env.TOKEN is not set. Make sure globalSetup assigns it.');
    }

    apiClient.setAuthToken(token);

    const dashboardApi = new DashboardAPI(apiClient, projectName);
    await use(dashboardApi);
  },

  // Fixture to make tests use SchemaValidator
  validateSchema: async ({}, use) => {
    await use(validateSchema);
  }
});