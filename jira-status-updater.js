const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const axios = require('axios');
require('dotenv').config();
const logger = require('./core/utils/logger');

const resultsPath = path.join(__dirname, 'test-results/results.xml');
const jiraRegex = /(SCRUM|JIRA)-\d+/i;

async function updateJiraStatus(issueId, passed) {
  const transition = passed ? 'Done' : 'To Do';

  try {
    const response = await axios.get(
      `${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueId}/transitions`,
      {
        auth: {
          username: process.env.JIRA_EMAIL,
          password: process.env.JIRA_TOKEN,
        },
        headers: { Accept: 'application/json' },
      }
    );

    const target = response.data.transitions.find(t =>
      t.name.toLowerCase() === transition.toLowerCase()
    );

    if (!target) {
      logger.error(`❌ Status is not found "${transition}" for ${issueId}`);
      return;
    }

    await axios.post(
      `${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueId}/transitions`,
      { transition: { id: target.id } },
      {
        auth: {
          username: process.env.JIRA_EMAIL,
          password: process.env.JIRA_TOKEN,
        },
      }
    );

    logger.info(`✅ ${issueId} Status changed "${transition}"`);
  } catch (err) {
    logger.error(`❌ Error when changing status ${issueId}:`, err.message);
  }
}

fs.readFile(resultsPath, (err, data) => {
  if (err) throw err;

  xml2js.parseString(data, async (err, result) => {
    if (err) throw err;

    const testcases = [];
    const testsuites = result.testsuites.testsuite || [];

    for (const suite of testsuites) {
      const cases = suite.testcase || [];
      testcases.push(...cases);
    }

    for (const test of testcases) {
      const name = test.$.name || '';
      const jiraMatch = name.match(jiraRegex);
      const passed = !test.failure;

      if (jiraMatch) {
        const issueId = jiraMatch[0];
        logger.info(`[${passed ? 'PASSED' : 'FAILED'}] ${name}`);
        logger.info(`   ↳ Connected to Jira: ${issueId}`);

        await updateJiraStatus(issueId, passed);
      } else {
        logger.error(`⚠️ Jira ID isn't present in the name: ${name}`);
      }
    }
  });
});