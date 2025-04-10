const baseComponents = require('./baseComponents');
const sidePanel = require('./sidePanel');

class BasePage extends baseComponents {
  constructor(page) {
    super(page);
    this.sidePanel = new sidePanel(this.page); // The page object is passed and stored for use in subclasses
  }
  // Selectors:
  signInToastMessage = this.page.locator('p', { hasText: 'Signed in' }).nth(0);
};

module.exports = BasePage;

// It is possible to call it without a constructor, since this.page=page 
// is initiated in the Root Class and accessible in the child classes
// But it is a good practice to mention 'super' - to show proper inheritance

// const baseComponents = require('./baseComponents');
// const sidePanel = require('./sidePanel');

// class BasePage extends baseComponents {
//     sidePanel = new sidePanel(this.page);  // The page object is passed and stored for use in subclasses
// };

// module.exports = BasePage;








