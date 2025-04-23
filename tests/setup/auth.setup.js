import { test as setup } from '../../core/fixtures/fixture';
const { loginAndSaveAuth } = require('../../core/configuration/helpers/loginHelper');

setup('authenticate', async () => {
  await loginAndSaveAuth();
});