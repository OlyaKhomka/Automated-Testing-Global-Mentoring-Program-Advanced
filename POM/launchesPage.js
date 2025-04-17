const BasePage = require('./basePage');

class LaunchesPage extends BasePage {
  constructor(page) {
    super(page);
  };
  //Selectors:
  allLaunchesButton = this.page.locator('.allLatestDropdown__value--QwA8E.allLatestDropdown__active--qisno');
  //dynamic selectors:
  createdDashboard = (createdDashboardTitle) => this.page.locator(`//*[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);

};

module.exports = LaunchesPage;