const BaseComponents = require("./baseComponents");

class confirmDuplicateComponent extends BaseComponents {
  constructor(page) {
    super(page);
  };
  confirmDuplicateButton = this.page.locator('.bigButton__big-button--BmG4Q.bigButton__color-booger--EpRlL');

};
module.exports = confirmDuplicateComponent;