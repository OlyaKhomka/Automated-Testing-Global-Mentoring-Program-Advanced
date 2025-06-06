import { test } from '../../core/api/fixture';
import { expect } from '@playwright/test';;
const { createPreconfiguredDashboardPayload } = require('../../core/api/apiHelpers/apiTestData/dashboardPayloads');

test.describe('Update dashboards and widgets', () => {


  let dashboardId;
  test.beforeAll('Create a dashboard for the further tests', async ({ dashboardApi }) => {
    const testData = Date.now();
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

  test('Positive Test: update name & description of a dashboard and verify it', async ({ dashboardApi }) => {
    const testData = Date.now();
    const payload = {
      name: testData,
      description: testData
    };

    const response = await dashboardApi.updateDashboard(dashboardId, payload);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Dashboard with ID = '${dashboardId}' successfully updated`);

    const dashboardResponse = await dashboardApi.getDashboard(dashboardId);
    expect(dashboardResponse.body.description).toBe(testData.toString());
    expect(dashboardResponse.body.name).toBe(testData.toString());

  });

  test('Negative Test: attempt to add a widget with a null payload', async ({ dashboardApi }) => {
    const payload = {};
    const response = await dashboardApi.addWidget(dashboardId, payload);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Incorrect Request. [Field 'addWidget' should not be null.] ");
  });

});