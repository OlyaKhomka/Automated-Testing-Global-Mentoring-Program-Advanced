const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const axios = require('axios');
require('dotenv').config();

const resultsPath = path.join(__dirname, 'test-results/results.xml');
const jiraRegex = /(SCRUM|JIRA)-\d+/i;

async function updateJiraStatus(issueId, passed) {
  const transition = passed ? 'Done' : 'To Do'; // Настрой по своей Jira workflow

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
      console.warn(`❌ Не найден переход "${transition}" для ${issueId}`);
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

    console.log(`✅ ${issueId} переведён в статус "${transition}"`);
  } catch (err) {
    console.error(`❌ Ошибка при обновлении ${issueId}:`, err.message);
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
        console.log(`🧪 [${passed ? 'PASSED' : 'FAILED'}] ${name}`);
        console.log(`   ↳ Связан с Jira: ${issueId}`);

        await updateJiraStatus(issueId, passed);
      } else {
        console.log(`⚠️ Jira ID не найден в названии: ${name}`);
      }
    }
  });
});
