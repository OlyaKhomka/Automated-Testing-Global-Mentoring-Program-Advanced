const BasePage = require('./basePage');

class LaunchesPage extends BasePage {
  constructor(page) {
    super(page)
    this.allLaunchesButton = this.page.locator('.allLatestDropdown__value--QwA8E.allLatestDropdown__active--qisno');
  };

  getCreatedDashboard(createdDashboardTitle) {
    return this.page.locator(`//*[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);
    
  }
};

module.exports = LaunchesPage;