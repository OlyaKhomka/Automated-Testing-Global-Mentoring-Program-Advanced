const BaseComponents = require('./baseComponents');

class SidePanel extends BaseComponents {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); // Call the parent constructor

        // **Selectors**:
        this.launchesButton = this.getLocators('.sidebarButton__sidebar-nav-btn--gbV_N', 1);
        this.launchesTooltip = this.getLocator('.tooltip__tooltip--rBEx7.tooltip__no-mobile--knDWj.tooltip__dark--RBXcd');
        this.dashboardButton = this.getLocator('.sidebarButton__nav-link--gZnHQ.sidebarButton__active--GG93E');
    }
}

module.exports = SidePanel;