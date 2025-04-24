const { expect } = require('@playwright/test');
const { baseURL } = require('../../core/configuration/helpers/loginHelper');

describe('Create Dashboard & Widget on Report Portal > Dashboard Page', function () {
  
  it('Add dashboard, configure widget, and verify they are present', async function () {
    const testData = Date.now().toString(); 
    const { dashboardPage, launchesPage } = this.pageFactory;
    await dashboardPage.addDashboard(testData, 'description2');
    await expect(dashboardPage.noWidgetMessage).toBeVisible();
    await dashboardPage.addWidgetWithNewFilter('Launch statistics chart', testData, testData);
    await this.page.goto(`${baseURL}/ui/#${process.env.DASHBOARD_NAME}/dashboard`);
    await expect(launchesPage.createdDashboard(testData)).toBeVisible();
  });
});