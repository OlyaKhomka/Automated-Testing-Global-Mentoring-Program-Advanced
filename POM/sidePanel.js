const BaseComponents = require('./baseComponents');

class SidePanel extends BaseComponents {
  constructor(page) {
    super(page);
    this.launchesButton = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N').nth(1); // Corrected spelling
  }
};

module.exports = SidePanel;

