import { test } from '../../core/api/fixture';
import { expect } from '@playwright/test';;
const { createPreconfiguredDashboardPayload } = require('../../core/api/apiHelpers/apiTestData/dashboardPayloads');

test.describe('Delete dashboards and widgets', () => {

  const testData = Date.now();
  let dashboardId;

  test.beforeAll('Create a dashboard for the further tests', async ({ dashboardApi }) => {
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

  test('Negative Test: attempt to delete a widget with incorrect ID', async ({ dashboardApi }) => {
    const response = await dashboardApi.deleteWidget(dashboardId, testData);
   
    expect(response.status).toBe(404);
    expect(response.body.message).toContain(`Widget with ID '${testData}' not found on project`);
  });

  test('Positive Test: Delete a dashboard', async ({ dashboardApi }) => {
    const response = await dashboardApi.deleteDashboard(dashboardId);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Dashboard with ID = '${dashboardId}' successfully deleted.`);
  });

});