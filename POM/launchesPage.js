// const BasePage = require('./basePage');

// class LaunchesPage extends BasePage {
//   constructor(page) {
//     super(page);
//   };
//   //Selectors:
//   allLaunchesButton = this.page.locator('.allLatestDropdown__value--QwA8E.allLatestDropdown__active--qisno');
//   //dynamic selectors:
//   createdDashboard = (createdDashboardTitle) => this.page.locator(`//*[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);

// };

// module.exports = LaunchesPage;

const BasePage = require('./basePage');

class LaunchesPage extends BasePage {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); // Call the parent constructor to initialize the context
    }

    // **Selectors**
    allLaunchesButton = this.getLocator('.allLatestDropdown__value--QwA8E.allLatestDropdown__active--qisno'); // Selector for the "All Launches" dropdown button

    // **Dynamic Selectors**
    createdDashboard = (createdDashboardTitle) =>
        this.getLocator(`//*[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`); // Selector for a dynamically created dashboard based on title
}

module.exports = LaunchesPage;