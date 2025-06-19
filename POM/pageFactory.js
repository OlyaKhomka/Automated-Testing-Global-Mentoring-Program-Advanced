const DashboardPage = require('./dashboardPage');
const LaunchesPage = require('./launchesPage');
const LogInPage = require('./logInPage');

class PageFactory {
    constructor(pageOrBrowser) {
        this.context = pageOrBrowser;

        // Determine the active framework
        const framework = process.env.TEST_FRAMEWORK?.toLowerCase();
        if (framework === 'playwright' || framework === 'wdio') {
            this.framework = framework;
        } else {
            throw new Error(
                'Invalid TEST_FRAMEWORK value. Use "playwright" or "wdio".'
            );
        }
    }

    // Instantiate all Page Objects with the correct context (page/browser).
    createPageObjects() {
        return {
            dashboardPage: new DashboardPage(this.context),
            launchesPage: new LaunchesPage(this.context),
            logInPage: new LogInPage(this.context),
        };
    }
}

module.exports = PageFactory;