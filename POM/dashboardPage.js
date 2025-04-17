const BasePage = require('./basePage');
const confirmDuplicateComponent = require('./confirmDuplicateComponent');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page); // Pass the page object to the base class
    this.confirmDuplicateComponent = new confirmDuplicateComponent(this.page);
  };
  // Selectors 
  addDashboardButton = this.page.locator('.addDashboardButton__add-dashboard-btn--acseh'); // Locator
  dashboardName = this.page.locator('.input__input--iYEmM');
  dashboardDescription = this.page.locator('.inputTextArea__input-text-area--N0goa');
  addButton = this.page.locator('//button[text()="Add"]');
  addWidgetButton = this.page.locator('//span[text()="Add new widget"]').nth(1);
  nextStepButton = this.page.locator('//span[text()="Next step"]');
  noWidgetMessage = this.page.locator('.emptyWidgetGrid__empty-widget-headline--ZocRI');
  submitFilterButton = this.page.locator('.bigButton__big-button--BmG4Q.addEditFilter__button-inline--eGR3g.bigButton__color-booger--EpRlL');
  demoFilter = this.page.locator('.widgetHeader__widget-name-block--AOAHS');
  addFilterButton = this.page.locator('//span[text()="Add filter"]');
  filterNameInput = this.page.locator('input[placeholder="Input filter name"]');
  launchNameInput = this.page.locator('input[placeholder="Enter name"]');
  duplicateOption = this.page.locator('.dashboardTable__dropdown-item--hEDwe', { hasText: 'Duplicate' });
  //dynamic selectors:
  widgetType = (widgetTypeText) => this.page.locator(`//div[contains(text(), "${widgetTypeText}")]`);
  filterType = (filterType) => this.page.locator(`//span[contains(text(), "${filterType}")]`);
  createdDashboard = (createdDashboardTitle) => this.page.locator(`//a[contains(@class, "dashboardTable__name") and text()="${createdDashboardTitle}"]`);
  //table interaction:
  rowName = (nameOfDashboard) => {
    const rowLocator = this.page
      .locator(`a.gridCell__grid-cell--EIqeC.gridCell__align-left--DFXWN.dashboardTable__name--t2a89:has-text("${nameOfDashboard}")`)
      .locator('xpath=..');
    return {
      root: rowLocator,
      deleteDashboard: rowLocator.locator('.icon__icon--coE7b.icon__icon-delete--lwBwP'),
      duplicateButton: rowLocator.locator('.dashboardTable__duplicate-dropdown--oLhBZ')
    };
  };


  async addDashboard(dashboardNameText, dashboardDescriptionText) {
    await this.addDashboardButton.click();
    await this.dashboardName.waitFor({ state: 'visible' });
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
    await this.submitFilterButton.click();
    await this.nextStepButton.click();
    await this.addButton.click();
  };

};

module.exports = DashboardPage;
