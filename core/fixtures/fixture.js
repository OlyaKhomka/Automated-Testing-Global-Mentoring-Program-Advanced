import { test as base } from '@playwright/test';
import DashboardPage from '../../POM/dashboardPage';
import LaunchesPage from '../../POM/launchesPage';
import logInPage from '../../POM/logInPage';

export const test = base.extend({
  // Automatically create page objects and add them to the test context
  pageFactory: async ({ page }, use) => {
    const pageFactory = {
      dashboardPage: new DashboardPage(page),
      launchesPage: new LaunchesPage(page),
      logInPage: new logInPage(page),
    };
    await use(pageFactory);  
  }
});
