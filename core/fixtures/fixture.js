// import { test as base } from '@playwright/test';
// import DashboardPage from '../../POM/dashboardPage';
// import LaunchesPage from '../../POM/launchesPage';
// import logInPage from '../../POM/logInPage';

// export const test = base.extend({
//   // Automatically create page objects and add them to the test context
//   pageFactory: async ({ page }, use) => {
//     const pageFactory = {
//       dashboardPage: new DashboardPage(page),
//       launchesPage: new LaunchesPage(page),
//       logInPage: new logInPage(page),
//     };
//     await use(pageFactory);  
//   }
// });

import { test as base } from '@playwright/test';
import PageFactory from '../../POM/pageFactory';

// Extend the Playwright test to include page objects
export const test = base.extend({
  pageFactory: async ({ page }, use) => {
    const pageFactory = new PageFactory(page); // Pass Playwright's `page`
    await use(pageFactory.createPageObjects()); // Inject page objects into the test context
  },
});