// const BaseComponents = require('./baseComponents');

// class SidePanel extends BaseComponents {
//   constructor(page) {
//     super(page);
//   }
//   //Selectors:
//   launchesButton = this.page.locator('.sidebarButton__sidebar-nav-btn--gbV_N').nth(1); // Corrected spelling
//   dashboardButton = this.page.locator('.sidebarButton__nav-link--gZnHQ.sidebarButton__active--GG93E');
// };

// module.exports = SidePanel;
const BaseComponents = require('./baseComponents');

class SidePanel extends BaseComponents {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); // Call the parent constructor

        // **Selectors**:
        this.launchesButton = this.getLocators('.sidebarButton__sidebar-nav-btn--gbV_N', 1); // Selector for the "Launches" button
        this.dashboardButton = this.getLocator('.sidebarButton__nav-link--gZnHQ.sidebarButton__active--GG93E'); // Selector for the "Dashboard" button
    }
}

module.exports = SidePanel;