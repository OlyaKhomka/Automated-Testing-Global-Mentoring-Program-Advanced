import { test } from '../../core/api/fixture';
import { expect } from '@playwright/test';;
const { createPreconfiguredDashboardPayload } = require('../../core/api/apiHelpers/apiTestData/dashboardPayloads');

test.describe('Create dashboards & widgets', () => {

  test('Positive Test: create a dashboard with a valid configuration and check of the widget size is correct', async ({ dashboardApi }) => {
    const testData = Date.now();
    const payload = await createPreconfiguredDashboardPayload(testData, [
      {
        widgetName: testData,
        widgetType: 'oldLineChart',
        widgetSize: { width: 4, height: 3 },
      }
    ]);
    const response = await dashboardApi.createPreconfiguredDashboard(payload);
    expect(response.status).toBe(200);

    const createdDashboardResponse = await dashboardApi.getAllDashboards({
      'filter.eq.name': testData.toString(),
    });
    expect(createdDashboardResponse.status).toBe(200);
    expect(createdDashboardResponse.body.content[0].widgets[0].widgetSize).toEqual(payload.config.widgets[0].widgetObject.widgetSize);
  });

  test('Negative Test: Create a dashboard with already existing name', async ({ dashboardApi }) => {
    const testData = Date.now();
    const payload = {
      name: testData,
      description: testData
    };
    const response = await dashboardApi.createDashboard(payload);
    expect(response.status).toBe(201);

    const errorResponse = await dashboardApi.createDashboard(payload);
    expect(errorResponse.status).toBe(409);
    expect(errorResponse.body.message).toBe(`Resource '${testData}' already exists. You couldn't create the duplicate.`);
  });

});