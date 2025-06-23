const { time } = require('console');
const PageFactory = require('../../POM/pageFactory');
require('dotenv').config();
const customCommands = require('../../core/utils/wdioCommands');

const TEST_ENV = process.env.TEST_ENV || 'local';
const baseURL = TEST_ENV === 'prod'
  ? process.env.BASE_URL_PROD
  : process.env.BASE_URL_LOCAL;

describe("General Test to verify Create, Delete, Duplicate actions applied to Dashboards", () => {
  let pageFactory, pageObjects;
  let testData;
  customCommands();

  beforeEach(async () => {
    pageFactory = new PageFactory(browser);
    pageObjects = pageFactory.createPageObjects();
    testData = Date.now();

    await browser.url(`${baseURL}/ui/#default_personal/dashboard`);
  });

  it('Create & read a new dashboard (without widgets)', async () => {
    await pageObjects.dashboardPage.addDashboardButton.waitForClickable({ timeout: 5_000 });
    await pageObjects.dashboardPage.addDashboardButton.click();

    await pageObjects.dashboardPage.dashboardName.waitForDisplayed({ timeout: 5_000 });
    await pageObjects.dashboardPage.dashboardName.setValue(testData);

    await pageObjects.dashboardPage.dashboardDescription.waitForDisplayed({ timeout: 5_000 });
    await pageObjects.dashboardPage.dashboardDescription.setValue(testData);

    await pageObjects.dashboardPage.addButton.waitForClickable({ timeout: 5_000 });
    await pageObjects.dashboardPage.addButton.click();

    await expect(pageObjects.dashboardPage.noWidgetMessage).toBeDisplayed({ timeout: 5_000 });
    await browser.url(`${baseURL}/ui/#default_personal/dashboard`);
    await expect(pageObjects.dashboardPage.createdDashboard(testData)).toBeDisplayedInViewport();
  });

  it('Delete a newly created dashboard', async () => {
    // 1. Create Dashboard
    await pageObjects.dashboardPage.addDashboardButton.waitForClickable({ timeout: 5000 });
    await pageObjects.dashboardPage.addDashboardButton.click();
    await pageObjects.dashboardPage.dashboardName.waitForDisplayed({ timeout: 5000 });
    await pageObjects.dashboardPage.dashboardName.setValue(testData);
    await pageObjects.dashboardPage.dashboardDescription.waitForDisplayed({ timeout: 5000 });
    await pageObjects.dashboardPage.dashboardDescription.setValue(testData);
    await pageObjects.dashboardPage.addButton.waitForClickable({ timeout: 5000 });
    await pageObjects.dashboardPage.addButton.click();
    await expect(pageObjects.dashboardPage.noWidgetMessage).toBeDisplayed({ timeout: 5000 });
    // 2. Go to DashboardPage
    await browser.url(`${baseURL}/ui/#default_personal/dashboard`);
    await pageObjects.dashboardPage.rowName(testData).root.waitForDisplayed({ timeout: 5000 });
    // 3. Delete Dashboard 
    await pageObjects.dashboardPage.rowName(testData).deleteDashboard.waitForDisplayed({ timeout: 5000 });
    await pageObjects.dashboardPage.rowName(testData).deleteDashboard.click();

    await pageObjects.dashboardPage.deleteConfirmComponent.confirmDeleteButton.waitForClickable({ timeout: 5000 });
    await pageObjects.dashboardPage.deleteConfirmComponent.confirmDeleteButton.click();

    await expect(pageObjects.dashboardPage.deleteToastMessage).toBeDisplayed({ timeout: 5000 });
  });


  it('Duplicate a newly created dashboard', async () => {
    // 1. Create Dashboard
    await pageObjects.dashboardPage.addDashboardButton.waitForClickable({ timeout: 5000 });
    await pageObjects.dashboardPage.addDashboardButton.click();
    await pageObjects.dashboardPage.dashboardName.waitForDisplayed({ timeout: 5000 });
    await pageObjects.dashboardPage.dashboardName.setValue(testData);
    await pageObjects.dashboardPage.dashboardDescription.waitForDisplayed({ timeout: 5000 });
    await pageObjects.dashboardPage.dashboardDescription.setValue(testData);
    await pageObjects.dashboardPage.addButton.waitForClickable({ timeout: 5000 });
    await pageObjects.dashboardPage.addButton.click();
    await expect(pageObjects.dashboardPage.noWidgetMessage).toBeDisplayed({ timeout: 5000 });
    // 2. Go to DashboardPage
    await browser.url(`${baseURL}/ui/#default_personal/dashboard`);
    await pageObjects.dashboardPage.rowName(testData).root.waitForDisplayed({ timeout: 5000 });
    // 3. Duplicate Dashboard 
    await pageObjects.dashboardPage.rowName(testData).duplicateButton.waitForDisplayed({ timeout: 5000 });
    await pageObjects.dashboardPage.rowName(testData).duplicateButton.click();
    await pageObjects.dashboardPage.duplicateOption.click();
    await pageObjects.dashboardPage.confirmDuplicateComponent.confirmDuplicateButton.waitForClickable({ timeout: 5000 });
    await pageObjects.dashboardPage.confirmDuplicateComponent.confirmDuplicateButton.click();

    await expect(pageObjects.dashboardPage.duplicateToastMessage).toBeDisplayed({ timeout: 5000 });
  });

  it('A test to use custom JS Commands: scroll to view; check if it is in the view; hover over element', async () => {
    //See if it is possible to scroll to the Pagination Input Element 
    await pageObjects.dashboardPage.pageSizeInput.waitForExist({ timeout: 5000 });
    await pageObjects.dashboardPage.pageSizeInput.jsScrollToView();

    // Check if it was scrolled
    await pageObjects.dashboardPage.pageSizeInput.waitForDisplayed({ timeout: 5000 });
    const isVisible = await pageObjects.dashboardPage.pageSizeInput.isScrolledIntoView();
    await expect(isVisible).toBe(true);

    //Hover over the Panel 
    await pageObjects.dashboardPage.sidePanel.launchesButton.waitForDisplayed({ timeout: 5000 });
    await pageObjects.dashboardPage.sidePanel.launchesButton.jsHover();
    await pageObjects.dashboardPage.sidePanel.launchesButton.waitForDisplayed({ timeout: 5000 });

    // See if the tooltip appeared 
    await expect(pageObjects.dashboardPage.sidePanel.launchesTooltip).toBeDisplayed({ timeout: 5000 });
  });
});

// Need to do later:
// Look at JS commands one more time
// Make json script better
// fix the hooks