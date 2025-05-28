const { request } = require('playwright');
require('dotenv').config();

async function loginAndGetToken() {
  const baseURL = process.env.BASE_URL_PROD;
  const username = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  const basicAuthToken = process.env.BASIC_AUTH_TOKEN; 

  if (!username || !password || !basicAuthToken) {
    throw new Error('No variable in .env file');
  }

  const apiContext = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicAuthToken,
    },
  });

  const body = new URLSearchParams({
    grant_type: 'password',
    username,
    password,
  }).toString();

  const response = await apiContext.post('/uat/sso/oauth/token', { data: body });

  if (response.status() !== 200) {
    throw new Error(`Error. Status: ${response.status()}`);
  }

  const responseBody = await response.json();

  if (!responseBody.access_token) {
    throw new Error('Error: Token is not found');
  }

  await apiContext.dispose();
  return responseBody.access_token;
}

module.exports = { loginAndGetToken };