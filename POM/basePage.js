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