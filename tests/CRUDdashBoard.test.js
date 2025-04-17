// @ts-check
import { expect } from '@playwright/test';
import { test } from '../core/configuration/fixtures/fixture'; // Import the custom 'test' object from fixtures.js

test.describe("General CRUD actions test for Report Portal > Dashboard Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ui/#default_personal/dashboard', { waitUntil: 'networkidle' });
  });

  test('Add dashboard & configure widget and check if they are present', async ({ page, pageFactory }) => {
    const dashboardName = Date.now().toString(); // to always generate unique numbers 
    await pageFactory.dashboardPage.addDashboard(dashboardName, 'description2');
    await expect(pageFactory.dashboardPage.noWidgetMessage).toBeVisible();
    await pageFactory.dashboardPage.addWidgetWithNewFilter('Launch statistics chart', 'DEMO', 'DEMO');
    await page.goto('/ui/#default_personal/dashboard');
    await expect(pageFactory.launchesPage.createdDashboard(dashboardName)).toBeVisible();
  });

  test('Successfully delete a certain dashboard', async ({ pageFactory, page }) => {
    const dashboardName = Date.now().toString(); // to always generate unique numbers 
    await pageFactory.dashboardPage.addDashboard(dashboardName, 'description2');
    await pageFactory.dashboardPage.sidePanel.dashboardButton.click();
    await pageFactory.dashboardPage.rowName(dashboardName).deleteDashboard.click();
    await pageFactory.dashboardPage.deleteConfirmComponent.confirmDeleteButton.click();
    await expect(pageFactory.dashboardPage.deleteToastMessage).toBeVisible();
    await expect(pageFactory.dashboardPage.rowName(dashboardName).root).not.toBeVisible();
  });

  test('Successfully duplicate a certain dashboard', async ({ pageFactory, page }) => {
    const dashboardName = Date.now().toString(); // to always generate unique numbers 
    await pageFactory.dashboardPage.addDashboard(dashboardName, 'description2');
    await pageFactory.dashboardPage.sidePanel.dashboardButton.click();
    await pageFactory.dashboardPage.rowName(dashboardName).duplicateButton.click();
    await pageFactory.dashboardPage.duplicateOption.click();
    await pageFactory.dashboardPage.confirmDuplicateComponent.confirmDuplicateButton.click();
    await expect(pageFactory.dashboardPage.duplicateToastMessage).toBeVisible();
  });

});