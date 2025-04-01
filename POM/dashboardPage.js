const BasePage = require('./basePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page); // Pass the page object to the base class
    this.addDashboardButton = this.page.locator('.addDashboardButton__add-dashboard-btn--acseh'); // Locator
    this.dashboardName = this.page.locator('.input__input--iYEmM');
    this.dashboardDescription = this.page.locator('.inputTextArea__input-text-area--N0goa');
    this.addButton = this.page.locator('//button[text()="Add"]');
    this.addWidgetButton = this.page.locator('//span[text()="Add new widget"]').nth(1);
    this.nextStepButton = this.page.locator('//span[text()="Next step"]');
    this.noWidgetMessage = this.page.locator('.emptyWidgetGrid__empty-widget-headline--ZocRI');
    this.demoFilter = this.page.locator('.widgetHeader__widget-name-block--AOAHS');
    this.addFilterButton = this.page.locator('//span[text()="Add filter"]');
    this.filterNameInput = this.page.locator('input[placeholder="Input filter name"]');
    this.launchNameInput = this.page.locator('input[placeholder="Enter name"]');
  
  };

  async addDasboard(dashboardNameText, dashboardDescriptionText) {
    await this.addDashboardButton.click();
    await this.dashboardName.fill(dashboardNameText);
    await this.dashboardDescription.fill(dashboardDescriptionText);
    await this.addButton.click();
  };

  async addWidgetWithExisitingFilter(widgetTypeText, filterType) {
    await this.addWidgetButton.click();
    await this.page.locator(`//div[contains(text(), "${widgetTypeText}")]`).click();
    await this.nextStepButton.click();
    await this.page.locator(`//span[contains(text(), "${filterType}")]`).click();
    await this.nextStepButton.click();
    await this.addButton.click();
  };

  async addWidgetWithNewFilter(widgetTypeText, filterName, launchName) {
    await this.addWidgetButton.click();
    await this.page.locator(`//div[contains(text(), "${widgetTypeText}")]`).click();
    await this.nextStepButton.click();
    await this.addFilterButton.click();
    await this.filterNameInput.fill(filterName);
    await this.launchNameInput.fill(launchName);
  };

  getCreatedDashboard(createdDashboardTitle) {
    return this.page.locator(`//a[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);
  }

};

module.exports = DashboardPage;
