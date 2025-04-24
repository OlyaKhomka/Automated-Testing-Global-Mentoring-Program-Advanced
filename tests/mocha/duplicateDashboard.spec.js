const { expect } = require('@playwright/test');

describe("Duplicate Dashboard on Report Portal > Dashboard Page", function () {

  it('Successfully duplicate a certain dashboard', async function () {
    const { dashboardPage } = this.pageFactory;
    const testData = Date.now().toString(); // to always generate unique numbers 
    await dashboardPage.addDashboard(testData, 'description2');
    await dashboardPage.sidePanel.dashboardButton.click();
    await dashboardPage.rowName(testData).duplicateButton.click();
    await dashboardPage.duplicateOption.click();
    await dashboardPage.confirmDuplicateComponent.confirmDuplicateButton.click();
    await expect(dashboardPage.duplicateToastMessage).toBeVisible();
  });
});
