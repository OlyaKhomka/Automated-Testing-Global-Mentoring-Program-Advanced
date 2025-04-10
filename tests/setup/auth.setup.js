//import { test as setup, expect } from '@playwright/test';
import { test as setup } from '../../core/configuration/fixtures/fixture';
import { expect } from 'playwright/test';
import path from 'path';
import logger from '../../core/configuration/logger';
const authFile = path.join(__dirname, '../testData/.auth/user.json');

setup('authenticate', async ({ page, pageFactory}) => {
  await page.goto('/');
  await pageFactory.logInPage.loginInput.fill(process.env.USER_EMAIL);
  await pageFactory.logInPage.passwordInInput.fill(process.env.USER_PASSWORD);
  await pageFactory.logInPage.logInButton.click();
  await expect(pageFactory.dashboardPage.signInToastMessage).toBeVisible();
  logger.info('Logged in');
  //it takes lots of time for the token to get retrived 
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(7000);
  await page.context().storageState({ path: authFile });
  logger.info('Storage state saved');
});
