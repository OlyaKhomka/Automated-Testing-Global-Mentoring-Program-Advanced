const { expect } = require('@playwright/test');

describe("Duplicate Dashboard on Report Portal > Dashboard Page", function () {

  it('Successfully duplicate a certain dashboard', async () => {
    const testData = Date.now().toString(); // to always generate unique numbers 
    await pageFactory.dashboardPage.addDashboard(testData, 'description2');
    await pageFactory.dashboardPage.sidePanel.dashboardButton.click();
    await pageFactory.dashboardPage.rowName(testData).duplicateButton.click();
    await pageFactory.dashboardPage.duplicateOption.click();
    await pageFactory.dashboardPage.confirmDuplicateComponent.confirmDuplicateButton.click();
    await expect(pageFactory.dashboardPage.duplicateToastMessage).toBeVisible();
  });
});
