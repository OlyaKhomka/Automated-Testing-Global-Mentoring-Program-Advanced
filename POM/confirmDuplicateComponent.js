// const BaseComponents = require("./baseComponents");

// class confirmDuplicateComponent extends BaseComponents {
//   constructor(page) {
//     super(page);
//   };
//   confirmDuplicateButton = this.page.locator('.bigButton__big-button--BmG4Q.bigButton__color-booger--EpRlL');

// };
// module.exports = confirmDuplicateComponent;

const BaseComponents = require('./baseComponents');

class ConfirmDuplicateComponent extends BaseComponents {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); // Call the parent constructor to initialize context
    }

    // **Selectors**
    get confirmDuplicateButton() {
        return this.getLocator('.bigButton__big-button--BmG4Q.bigButton__color-booger--EpRlL');
    }
}

module.exports = ConfirmDuplicateComponent;
