const BasePage = require('./basePage');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);  // Pass the page object to the base class
    this.addDashboardButton = this.page.locator('.addDashboardButton__add-dashboard-btn--acseh');  // Locator
    this.dashboardName = this.page.locator('.input__input--iYEmM');
    this.dashboardDescription = this.page.locator('.inputTextArea__input-text-area--N0goa');
    this.addButton = this.page.locator('//button[text()="Add"]');
    this.addWidgetButton = this.page.locator('//span[text()="Add new widget"]').nth(1);
    this.nextStepButton = this.page.locator('//span[text()="Next step"]');
    this.noWidgetMessage = this.page.locator('.emptyWidgetGrid__empty-widget-headline--ZocRI');
  };

  async addDasboard(dashboardNameText, dashboardDescriptionText) {
    await this.addDashboardButton.click();
    await this.dashboardName.fill(dashboardNameText);
    await this.dashboardDescription.fill(dashboardDescriptionText);
    await this.addButton.click();
  };

  async addWidget(widgetTypeText, filterType) {
    await this.addWidgetButton.click();
    await this.page.locator(`//div[contains(text(), "${widgetTypeText}")]`).click();
    await this.nextStepButton.click();
    await this.page.locator(`//span[contains(text(), "${filterType}")]`).click();
    await this.nextStepButton.click();
    await this.addButton.click();
  }

};

module.exports = DashboardPage;
