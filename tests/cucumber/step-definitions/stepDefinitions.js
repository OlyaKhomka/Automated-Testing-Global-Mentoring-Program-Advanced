const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// action steps 
Given('I navigate to {string}', { timeout: 10000 }, async function (url) {
  await this.page.goto(`${this.baseURL}` + url);
});

Given('I click {string}', async function (elementPath) {
  const elements = await this.elementHelper.getLocator(elementPath);
  await elements.click();
});

Given('I add new dashboard with the name {string} and description {string}', async function (dashboardNameText, dashboardDescriptionText) {
  await this.pageFactory.dashboardPage.addDashboard(dashboardNameText, dashboardDescriptionText);
});

Given('I add new widget with {string} widget type & {string} filter name & {string} launch name', async function (widgetTypeText, filterName, launchName) {
  await this.pageFactory.dashboardPage.addWidgetWithNewFilter(widgetTypeText, filterName, launchName);
});

Given('I type {string} into {string}', async function (inputText, elementPath) {
  const elements = await this.elementHelper.getLocator(elementPath);
  await elements.fill(inputText);
});

//step to interact with the rows
Given('I click {string} button in table row with name {string}', async function (rowButton, rowName) {
  const value = rowButton.toLowerCase();
  const row = this.pageFactory.dashboardPage.rowName(rowName);
  switch (value) {
    case 'duplicate':
      await row.duplicateButton.click();
      break;
    case 'delete':
      await row.deleteDashboard.click();
      break;
    default:
      throw new Error('Unknown button type');
  }
});

// assertion steps
Then('I expect {string} to be visible', async function (elementPath) {
  const elements = await this.elementHelper.getLocator(elementPath);
  await expect(elements).toBeVisible();
});
Then('I expect {string} to not be visible', async function (elementPath) {
  const elements = await this.elementHelper.getLocator(elementPath);
  await expect(elements).not.toBeVisible();
});

Then('I expect dashboard with {string} name to be visible', async function (dashboardName) {
  await expect(this.pageFactory.dashboardPage.createdDashboard(dashboardName)).toBeVisible();
});

//step to validate the passed test data
Given('I expect dashboard with the following name & description to be visible:', async function (dataTable) {
  const dataObject = dataTable.rowsHash();

  for (const key in dataObject) {
    const rawValue = dataObject[key];
    const resolvedValue = this.data[rawValue] ?? rawValue;

    if (key.toLowerCase() === 'name') {
      await expect(this.pageFactory.dashboardPage.createdDashboard(resolvedValue)).toBeVisible();
    }

    if (key.toLowerCase() === 'description') {
      await expect(this.pageFactory.dashboardPage.createdDashboardDescription.filter({ hasText: resolvedValue })).toBeVisible();
    }
  }
});


// memory invoking steps
Given('I generate and remember Test Data as {string}', { timeout: 10000 }, async function (testDataName) {
  const generate = Date.now().toString();
  this.remember(testDataName, generate);
});

Then('I expect dashboard with remembered {string} name to be visible', async function (generatedData) {
  const dashboardName = this.recall(generatedData);
  await expect(this.pageFactory.dashboardPage.createdDashboard(dashboardName)).toBeVisible();
});

Given('I add new dashboard with the remembered name {string} and description {string}', async function (generatedTestData, dashboardDescriptionText) {
  const dashboardNameText = this.recall(generatedTestData);
  await this.pageFactory.dashboardPage.addDashboard(dashboardNameText, dashboardDescriptionText);
});

Given('I add new widget with {string} widget type & remembered {string} filter name & remembered {string} launch name', async function (widgetTypeText, generatedData, generatedData2) {
  const filterName = this.recall(generatedData);
  const launchName = this.recall(generatedData2);
  await this.pageFactory.dashboardPage.addWidgetWithNewFilter(widgetTypeText, filterName, launchName);
});