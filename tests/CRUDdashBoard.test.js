// @ts-check
import { expect } from '@playwright/test';
import { test } from '../core/configuration/fixtures/fixture'; // Import the custom 'test' object from fixtures.js

test.describe("General CRUD actions test for Report Portal > Dashboard Page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ui/#default_personal/dashboard', { waitUntil: 'networkidle' });
  });

  // test('Successfully access dashboard', async ({ page, pageFactory }) => {
  //   await expect(pageFactory.dashboardPage.addDashboardButton).toBeVisible();
  // });

  test('Add dashboard and check if it is present', async ({ page, pageFactory }) => {
    const dashboardName = Date.now().toString(); // to always generate unique numbers 
    await pageFactory.dashboardPage.addDashboard(dashboardName, 'description2');
    await expect (pageFactory.dashboardPage.noWidgetMessage).toBeVisible();
    await pageFactory.dashboardPage.addWidgetWithNewFilter('Launch statistics chart', 'DEMO', 'DEMO');
    await page.goto('/ui/#default_personal/dashboard');
    await expect(pageFactory.launchesPage.createdDashboard(dashboardName)).toBeVisible();
  });

  // test('Successfully access Launches', async ({ pageFactory, page }) => {
  //   await pageFactory.dashboardPage.sidePanel.launchesButton.click();
  //   await expect(pageFactory.launchesPage.allLaunchesButton).toBeVisible();
  // });

});
