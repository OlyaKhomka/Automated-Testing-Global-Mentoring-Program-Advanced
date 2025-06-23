const BasePage = require('./basePage');
const ConfirmDuplicateComponent = require('./confirmDuplicateComponent');

class DashboardPage extends BasePage {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); 
        this.confirmDuplicateComponent = new ConfirmDuplicateComponent(this.context); 
    }

    // Selectors
    addDashboardButton = this.getLocator('.addDashboardButton__add-dashboard-btn--acseh');
    dashboardName = this.getLocator('.input__input--iYEmM');
    dashboardDescription = this.getLocator('.inputTextArea__input-text-area--N0goa');
    addButton = this.getLocator('//button[text()="Add"]');
    addWidgetButton = this.getLocators('//span[text()="Add new widget"]', 1); 
    nextStepButton = this.getLocator('//span[text()="Next step"]');
    noWidgetMessage = this.getLocator('.emptyWidgetGrid__empty-widget-headline--ZocRI');
    submitFilterButton = this.getLocator('.bigButton__big-button--BmG4Q.addEditFilter__button-inline--eGR3g.bigButton__color-booger--EpRlL');
    demoFilter = this.getLocator('.widgetHeader__widget-name-block--AOAHS');
    addFilterButton = this.getLocator('//span[text()="Add filter"]');
    filterNameInput = this.getLocator('input[placeholder="Input filter name"]');
    launchNameInput = this.getLocator('input[placeholder="Enter name"]');
    duplicateOption = this.getLocators('.dashboardTable__dropdown-item--hEDwe', 0);
    duplicateDashboardError = this.getLocator('.notificationItem__message-container--eN8Rd.notificationItem__error--gkqHe');
    createdDashboardDescription = this.getLocator('.dashboardTable__description--tHp7Q');
    pageSizeInput = this.getLocator('.pageSizeControl__page-size--TqlNJ');

    // Dynamic Selectors
    widgetType = (widgetTypeText) => this.getLocator(`//div[contains(text(), "${widgetTypeText}")]`);
    filterType = (filterTypeText) => this.getLocator(`//span[contains(text(), "${filterTypeText}")]`);
    createdDashboard = (createdDashboardTitle) => this.getLocator(`//a[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);

    // Table Interaction
    rowName = (nameOfDashboard) => {
        const xpathSelector = `//a[contains(@class, 'gridCell__grid-cell--EIqeC') and contains(@class, 'gridCell__align-left--DFXWN') and contains(@class, 'dashboardTable__name--t2a89') and normalize-space(text())="${nameOfDashboard}"]`;

        if (this.isPlaywright) {
            const nameElement = this.getLocator(xpathSelector);
            const root = nameElement.locator('xpath=..');
            return {
                root,
                deleteDashboard: root.locator('.icon__icon--coE7b.icon__icon-delete--lwBwP'),
                duplicateButton: root.locator('.dashboardTable__duplicate-dropdown--oLhBZ'),
            };
        } else {
            const rootSelector = `${xpathSelector}/..`;
            const root = this.getLocator(rootSelector);
            return {
                root,
                deleteDashboard: root.$('.icon__icon--coE7b.icon__icon-delete--lwBwP'),
                duplicateButton: root.$('.dashboardTable__duplicate-dropdown--oLhBZ'),
            };
        }
    };

    // ** Playwright Actions **

    /**
     * Add a new dashboard with the given name and description.
     * @param {string} dashboardNameText - Name of the new dashboard.
     * @param {string} dashboardDescriptionText - Description of the new dashboard.
     */
    async addDashboard(dashboardNameText, dashboardDescriptionText) {
        await this.addDashboardButton.click();
        await this.dashboardName.waitFor({ state: 'visible' });
        await this.dashboardName.fill(dashboardNameText);
        await this.dashboardDescription.fill(dashboardDescriptionText);
        await this.addButton.click();
    }

    /**
     * Add a widget using an existing filter.
     * @param {string} widgetTypeText - Type of the widget.
     * @param {string} filterTypeText - Type of the filter.
     */
    async addWidgetWithExistingFilter(widgetTypeText, filterTypeText) {
        await this.addWidgetButton.click();
        await this.widgetType(widgetTypeText).click();
        await this.nextStepButton.click();
        await this.filterType(filterTypeText).click();
        await this.nextStepButton.click();
        await this.addButton.click();
    }

    /**
     * Add a widget with a new filter by providing filter name and launch name.
     * @param {string} widgetTypeText - Type of the widget.
     * @param {string} filterName - Name of the new filter.
     * @param {string} launchName - Name of the launch.
     */
    async addWidgetWithNewFilter(widgetTypeText, filterName, launchName) {
        await this.addWidgetButton.click();
        await this.widgetType(widgetTypeText).click();
        await this.nextStepButton.click();
        await this.addFilterButton.click();
        await this.filterNameInput.fill(filterName);
        await this.launchNameInput.fill(launchName);
        await this.submitFilterButton.click();
        await this.nextStepButton.click();
        await this.context.waitForTimeout(1000);
        await this.addButton.click();
    }
}

module.exports = DashboardPage;