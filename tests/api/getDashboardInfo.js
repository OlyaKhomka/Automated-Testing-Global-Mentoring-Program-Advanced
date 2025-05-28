import { test } from '../../core/api/fixture';
import { expect } from '@playwright/test';;
const { createPreconfiguredDashboardPayload } = require('../../core/api/apiHelpers/apiTestData/dashboardPayloads');
const { dashboardSchema } = require('../../core/api/apiHelpers/apiTestData/getDashboardSchemas');

test.describe("Retrieve dashboards data & verify it", () => {

  const testData = Date.now();
  let dashboardId;

  test.beforeAll("Create dashboard to test it", async ({ dashboardApi }) => {

    const payload = await createPreconfiguredDashboardPayload(testData, [
      {
        widgetName: 'Launch Summary',
        widgetType: 'launchStatistics',
        widgetSize: { width: 3, height: 2 },
      }
    ]);
    const response = await dashboardApi.createPreconfiguredDashboard(payload);
    expect(response.status).toBe(200);

    const createdDashboardResponse = await dashboardApi.getAllDashboards({
      'filter.eq.name': testData.toString(),
    });
    expect(createdDashboardResponse.status).toBe(200);

    dashboardId = createdDashboardResponse.body.content[0]?.id;
  });

  test('Negative test: Retrieve Dashboard with invalid ID ', async ({ dashboardApi }) => {
    const response = await dashboardApi.getDashboard(testData);
    expect(response.status).toBe(404);
  });

  test('Positive test: Retrieve dashboard config & verify the Widget Type', async ({ dashboardApi }) => {
    const response = await dashboardApi.getDashboardConfig(dashboardId);
    const widgetType = response.body.widgets[0].widgetObject.widgetType;

    expect(widgetType).toBe("launchStatistics");
  });

  test('Positive Test: Validate response schema', async ({ dashboardApi, validateSchema }) => {
    const response = await dashboardApi.getDashboard(dashboardId);
    validateSchema(response.body, dashboardSchema);
  });


});