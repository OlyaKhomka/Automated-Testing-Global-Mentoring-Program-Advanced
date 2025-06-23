const BasePage = require('./basePage');

class LaunchesPage extends BasePage {
    constructor(pageOrBrowser) {
        super(pageOrBrowser);
    }

    // **Selectors**
    allLaunchesButton = this.getLocator('.allLatestDropdown__value--QwA8E.allLatestDropdown__active--qisno'); // Selector for the "All Launches" dropdown button

    // **Dynamic Selectors**
    createdDashboard = (createdDashboardTitle) =>
        this.getLocator(`//*[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`); // Selector for a dynamically created dashboard based on title
}

module.exports = LaunchesPage;