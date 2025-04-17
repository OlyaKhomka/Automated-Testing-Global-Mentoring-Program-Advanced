const { expect } = require('@playwright/test');

describe("Create Dashboard & Widget on Report Portal > Dashboard Page", function () {

  it('Add dashboard & configure widget and check if they are present', async function () {
    const testData = Date.now().toString(); // to always generate unique numbers 
    await pageFactory.dashboardPage.addDashboard(testData, 'description2');
    await expect(pageFactory.dashboardPage.noWidgetMessage).toBeVisible();
    await pageFactory.dashboardPage.addWidgetWithNewFilter('Launch statistics chart', testData, testData);
    await page.goto(`${baseURL}/ui/#default_personal/dashboard`);
    await expect(pageFactory.launchesPage.createdDashboard(testData)).toBeVisible();
  });
});
