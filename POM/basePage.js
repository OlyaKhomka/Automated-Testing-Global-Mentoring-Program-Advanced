// const baseComponents = require('./baseComponents');
// const sidePanel = require('./sidePanel');
// const deleteConfirmComponent = require('./deleteConfirmComponent');
// const { $, $$ } = require('@wdio/globals'); 

// class BasePage extends baseComponents {
//   constructor(page) {
//     super(page);
//     this.sidePanel = new sidePanel(this.page); // The page object is passed and stored for use in subclasses
//     this.deleteConfirmComponent = new deleteConfirmComponent(this.page);
//   }
//   // Selectors:
//   signInToastMessage = this.page.locator('p', { hasText: 'Signed in' }).nth(0);
//   deleteToastMessage = this.page.locator('p', { hasText: 'Dashboard has been deleted' }).nth(0);
//   duplicateToastMessage = this.page.locator('p', { hasText: 'Dashboard has been duplicated' }).nth(0);

// };
// module.exports = BasePage;

// It is possible to call it without a constructor, since this.page=page
// is initiated in the Root Class and accessible in the child classes
// But it is a good practice to mention 'super' - to show proper inheritance

// const baseComponents = require('./baseComponents');
// const sidePanel = require('./sidePanel');

// class BasePage extends baseComponents {
//     sidePanel = new sidePanel(this.page);  // The page object is passed and stored for use in subclasses
// };

// module.exports = BasePage;




// const BaseComponents = require('./baseComponents'); // Base class for shared functionality
// const SidePanel = require('./sidePanel');           // SidePanel PageObject
// const DeleteConfirmComponent = require('./deleteConfirmComponent'); // Delete Confirmation Component
// const { $, $$ } = require('@wdio/globals');         // WDIO's globally exposed element methods

// class BasePage extends BaseComponents {
//     constructor(pageOrBrowser) {
//         super(pageOrBrowser); // Ensure parent constructor is invoked
//         this.context = pageOrBrowser; // `page` for Playwright; `browser` for WDIO

//         // Framework detection (Playwright or WDIO)
//         const framework = process.env.TEST_FRAMEWORK?.toLowerCase();
//         if (framework === 'playwright' || framework === 'wdio') {
//             this.framework = framework; // Store framework type
//         } else {
//             throw new Error(
//                 'Invalid TEST_FRAMEWORK value. Use "playwright" or "wdio".'
//             );
//         }

//         // Initialize additional components
//         //this.sidePanel = new SidePanel(this.context); // Initialize SidePanel
//            this.sidePanel = new SidePanel(this.context, this.getLocator.bind(this), this.getLocators.bind(this));
//             this.deleteConfirmComponent = new DeleteConfirmComponent(this.context, this.getLocator.bind(this), this.getLocators.bind(this));
//         //this.deleteConfirmComponent = new DeleteConfirmComponent(this.context); // Initialize DeleteConfirmComponent
//     }

//     /**
//      * Retrieve a single locator dynamically based on the testing framework.
//      *
//      * @param {string} selector - The selector string for the element.
//      * @returns {Object} Locator object specific to Playwright or WebdriverIO.
//      */
//     getLocator(selector) {
//         if (this.framework === 'playwright') {
//             return this.context.locator(selector); // Playwright's locator
//         } else if (this.framework === 'wdio') {
//             return $(selector); // WDIO's `$(...)` for single element
//         } else {
//             throw new Error(`Unsupported framework: ${this.framework}`);
//         }
//     }

//     /**
//      * Retrieve multiple locators dynamically based on the testing framework.
//      *
//      * @param {string} selector - The selector string for the elements.
//      * @returns {Object[]} Array of locator objects for Playwright or WebdriverIO.
//      */
// getLocators(selector, nth = null) {
//     if (this.framework === 'playwright') {
//         return nth !== null 
//             ? this.context.locator(selector).nth(nth) 
//             : this.context.locator(selector); // Playwright supports .nth()
//     } else if (this.framework === 'wdio') {
//         const elements = $$(selector); // WebDriverIO's $$() returns an array
//         return nth !== null ? elements[nth] : elements; // Return nth element or all matches
//     } else {
//         throw new Error(`Unsupported framework: ${this.framework}`);
//     }
// }

//     // Example methods for toast messages
//     async getSignInToastMessage() {
//         return this.getLocator('p:has-text("Signed in")'); // Adjusted for framework compatibility
//     }

//     async getDeleteToastMessage() {
//         return this.getLocator('p:has-text("Dashboard has been deleted")'); // Adjusted for framework compatibility
//     }

//     async getDuplicateToastMessage() {
//         return this.getLocator('p:has-text("Dashboard has been duplicated")'); // Adjusted for framework compatibility
//     }
// }

// module.exports = BasePage;

const BaseComponents = require('./baseComponents');
const SidePanel = require('./sidePanel');
const DeleteConfirmComponent = require('./deleteConfirmComponent');

class BasePage extends BaseComponents {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); // Initialize parent class

        // Initialize additional components
        this.sidePanel = new SidePanel(this.context); // No more passing `getLocator`
        this.deleteConfirmComponent = new DeleteConfirmComponent(this.context);
    }
    signInToastMessage = this.getLocator('p:has-text("Signed in")');
    deleteToastMessage = this.getLocator(`//h2[contains(@class, '_title_14lm6_32') and normalize-space(text())="Dashboard has been deleted"]`);
    duplicateToastMessage = this.getLocator(`//h2[contains(@class, '_title_14lm6_32') and normalize-space(text())="Dashboard has been duplicated successfully"]`);
}

module.exports = BasePage;