const { expect } = require('@playwright/test');

describe("Delete Dashboard on Report Portal > Dashboard Page", function () {

  it('Successfully delete a certain dashboard', async () => {
    const testData = Date.now().toString(); // to always generate unique numbers 
    await pageFactory.dashboardPage.addDashboard(testData, 'description2');
    await pageFactory.dashboardPage.sidePanel.dashboardButton.click();
    await pageFactory.dashboardPage.rowName(testData).deleteDashboard.click();
    await pageFactory.dashboardPage.deleteConfirmComponent.confirmDeleteButton.click();
    await expect(pageFactory.dashboardPage.deleteToastMessage).toBeVisible();
    await expect(pageFactory.dashboardPage.rowName(testData).root).not.toBeVisible();
  });
});
