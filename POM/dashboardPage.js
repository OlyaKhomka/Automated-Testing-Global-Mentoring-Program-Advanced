const BasePage = require('./basePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page); // Pass the page object to the base class
};
// Selectors 
addDashboardButton = this.page.locator('.addDashboardButton__add-dashboard-btn--acseh'); // Locator
dashboardName = this.page.locator('.input__input--iYEmM');
dashboardDescription = this.page.locator('.inputTextArea__input-text-area--N0goa');
addButton = this.page.locator('//button[text()="Add"]');
addWidgetButton = this.page.locator('//span[text()="Add new widget"]').nth(1);
nextStepButton = this.page.locator('//span[text()="Next step"]');
noWidgetMessage = this.page.locator('.emptyWidgetGrid__empty-widget-headline--ZocRI');
demoFilter = this.page.locator('.widgetHeader__widget-name-block--AOAHS');
addFilterButton = this.page.locator('//span[text()="Add filter"]');
filterNameInput = this.page.locator('input[placeholder="Input filter name"]');
launchNameInput = this.page.locator('input[placeholder="Enter name"]');
//dynamic selectors:
widgetType = (widgetTypeText) => this.page.locator(`//div[contains(text(), "${widgetTypeText}")]`);
filterType = (filterType) => this.page.locator(`//span[contains(text(), "${filterType}")]`);
createdDashboard = (createdDashboardTitle) => this.page.locator(`//a[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);

  async addDashboard(dashboardNameText, dashboardDescriptionText) {
    await this.addDashboardButton.click();
    await this.dashboardName.fill(dashboardNameText);
    await this.dashboardDescription.fill(dashboardDescriptionText);
    await this.addButton.click();
  };

  async addWidgetWithExistingFilter(widgetTypeText, filterType) {
    await this.addWidgetButton.click();
    await this.widgetType(widgetTypeText).click();
    await this.nextStepButton.click();
    await this.filterType(filterType).click();
    await this.nextStepButton.click();
    await this.addButton.click();
  };

  async addWidgetWithNewFilter(widgetTypeText, filterName, launchName) {
    await this.addWidgetButton.click();
    await this.widgetType(widgetTypeText).click();
    await this.nextStepButton.click();
    await this.addFilterButton.click();
    await this.filterNameInput.fill(filterName);
    await this.launchNameInput.fill(launchName);
  };

  // getCreatedDashboard(createdDashboardTitle) {
  //   return this.page.locator(`//a[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);
  // }

};

module.exports = DashboardPage;
