require('dotenv').config();

module.exports = {
  endpoint: process.env.REPORT_PORTAL_ENDPOINT || 'https://demo.reportportal.io/api/v1',
  apiKey: process.env.REPORT_PORTAL_TOKEN,
  launch: 'Playwright UI Tests Launch',
  project: process.env.REPORT_PORTAL_PROJECT || 'default_personal',
  description: 'Playwright tests integration with Report Portal',
  debug: false,
  attributes: [
    { key: 'extendTestDescriptionWithLastError', value: 'true' },
    { key: 'uploadVideo', value: 'true' },
    { key: 'uploadTrace', value: 'true' },
  ]
};
