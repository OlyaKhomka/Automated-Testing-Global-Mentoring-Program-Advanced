const { expect } = require('@playwright/test');

describe("Delete Dashboard on Report Portal > Dashboard Page", function () {

  it('Successfully delete a certain dashboard', async function () {
    const testData = Date.now().toString();
    const { dashboardPage } = this.pageFactory;
    await dashboardPage.addDashboard(testData, 'description2');
    await dashboardPage.sidePanel.dashboardButton.click();
    await dashboardPage.rowName(testData).deleteDashboard.click();
    await dashboardPage.deleteConfirmComponent.confirmDeleteButton.click();
    await expect(dashboardPage.deleteToastMessage).toBeVisible();
    await expect(dashboardPage.rowName(testData).root).not.toBeVisible();
  });
});