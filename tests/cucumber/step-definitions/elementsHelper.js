const logger = require('../../../core/utils/logger');

class ElementHelper {
  constructor(pageFactory) {
    this.pageFactory = pageFactory;
  }
  async getLocator(elements) {

    const stingNoSpace = elements.replace(/\s+/g, '');
    const stringToLowerCase = stingNoSpace.replace(/\b\p{Lu}/gu, match => match.toLowerCase());
    const arrayPathToElement = stringToLowerCase.split(">");

    logger.info(`Created array - ${arrayPathToElement}`);

    const pageName = arrayPathToElement.shift();
    let pageComponent = null;
    const element = arrayPathToElement.pop();

    let locator;

    if (arrayPathToElement.length > 0) {
      pageComponent = arrayPathToElement[0];
      locator = await this.pageFactory[pageName][pageComponent][element];
    } else {
      locator = await this.pageFactory[pageName][element];
    }

    logger.info('Locator: ', locator);
    return locator;
  }
}
module.exports = ElementHelper;