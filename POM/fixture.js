import { test as base } from '@playwright/test';
import DashboardPage from './dashboardPage';
import LaunchesPage from './launchesPage';

export const test = base.extend({
  // Automatically create page objects and add them to the test context
  pageFactory: async ({ page }, use) => {
    const pageFactory = {
      dashboardPage: new DashboardPage(page),
      launchesPage: new LaunchesPage(page),
    };
    await use(pageFactory);  
  }
});
