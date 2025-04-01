import { test as setup, expect } from '@playwright/test';
import path from 'path';
import logger from '../logger';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.locator(".inputOutside__input--Ad7Xu[placeholder = 'Login']").fill(process.env.USER_EMAIL);
  await page.locator(".inputOutside__input--Ad7Xu[type = 'password']").fill(process.env.USER_PASSWORD);
  await page.locator(".loginForm__login-button-container--KT9g6").click();
  logger.info('Logged in');
  //it takes lots of time for the token to get retrived 
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(7000);
  await page.context().storageState({ path: authFile });
  logger.info('Storage state saved');
});
