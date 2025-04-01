// @ts-check
import { expect } from '@playwright/test';
import { test } from '../POM/fixture'; // Import the custom 'test' object from fixtures.js

test.describe("General Tests for Report Portal", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/ui/#default_personal/dashboard');
  });

  // test('Successfully access dashboard', async ({ page, pageFactory }) => {
  //   await expect(pageFactory.dashboardPage.addDashboardButton).toBeVisible();
  // });

  test('Add dasboard and check if it is present', async ({ page, pageFactory }) => {
    await pageFactory.dashboardPage.addDasboard('dashboard13', 'description2');
    await expect (pageFactory.dashboardPage.noWidgetMessage).toBeVisible();
    await pageFactory.dashboardPage.addWidgetWithNewFilter('Launch statistics chart', 'DEMO', 'DEMO');
    await page.goto('/ui/#default_personal/dashboard');
    await expect(pageFactory.launchesPage.getCreatedDashboard('dashboard13')).toBeVisible();
  });

  // test('Successfully access Launches', async ({ pageFactory, page }) => {
  //   await pageFactory.dashboardPage.sidePanel.launchesButton.click();
  //   await expect(pageFactory.launchesPage.allLaunchesButton).toBeVisible();
  // });

});
