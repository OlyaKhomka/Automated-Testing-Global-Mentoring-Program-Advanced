
// class BaseComponents {
//   constructor(page) {
//     this.page = page;
//   }
// };

// module.exports = BaseComponents;
// class BaseComponents {
//     /**
//      * Initialize the page/browser context
//      * @param {Object} pageOrBrowser - Playwright's `page` or WebdriverIO's `browser`.
//      */
//     constructor(pageOrBrowser) {
//         this.page = pageOrBrowser; // Store the page/browser context
//     }
// }

// module.exports = BaseComponents;

class BaseComponents {
    constructor(pageOrBrowser) {
        this.context = pageOrBrowser; // Playwright's `page` or WebDriverIO's `browser`
        this.framework = process.env.TEST_FRAMEWORK?.toLowerCase(); // Detect framework

        if (this.framework !== 'playwright' && this.framework !== 'wdio') {
            throw new Error('Invalid TEST_FRAMEWORK value. Use "playwright" or "wdio".');
        }

        this.isPlaywright = this.framework === 'playwright';
        this.isWDIO = this.framework === 'wdio';
    }

    // Retrieve a single locator dynamically based on the testing framework.

    getLocator(selector) {
        if (this.framework === 'playwright') {
            return this.context.locator(selector); // Playwright method
        } else if (this.framework === 'wdio') {
            return $(selector); // WebDriverIO method
        }
        throw new Error(`Unsupported framework: ${this.framework}`);
    }

    // Retrieve multiple locators dynamically based on the testing framework.

    getLocators(selector, nth = null) {
        if (this.framework === 'playwright') {
            const locator = this.context.locator(selector);
            return nth !== null ? locator.nth(nth) : locator; // Use `.nth()` for specific elements
        } else if (this.framework === 'wdio') {
            const elements = $$(selector); // WDIO's $$() returns all matching elements
            return nth !== null ? elements[nth] : elements;
        }
        throw new Error(`Unsupported framework: ${this.framework}`);
    }
}

module.exports = BaseComponents;