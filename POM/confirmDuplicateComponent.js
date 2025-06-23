
const BaseComponents = require('./baseComponents');

class ConfirmDuplicateComponent extends BaseComponents {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); 
    }

    // **Selectors**
    get confirmDuplicateButton() {
        return this.getLocator('.bigButton__big-button--BmG4Q.bigButton__color-booger--EpRlL');
    }
}

module.exports = ConfirmDuplicateComponent;
