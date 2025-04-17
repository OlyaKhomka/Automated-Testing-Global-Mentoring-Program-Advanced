const BaseComponents = require('./baseComponents');

class SidePanel extends BaseComponents {
  constructor(page) {
    super(page);
  }
  //Selectors:
  launchesButton = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N').nth(1); // Corrected spelling
  dashboardButton = this.page.locator('.sidebarButton__nav-link--gZnHQ.sidebarButton__active--GG93E');
};

module.exports = SidePanel;

