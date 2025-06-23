// const BaseComponents = require('./baseComponents');

// class DeleteConfirmComponent extends BaseComponents {
//   constructor(page) {
//     super(page);
//     this.deleteConfirmModal = this.page.locator('.modalLayout__modal-window--jrhO6.modal-window-animation-enter-done');
//     this.confirmDeleteButton = this.deleteConfirmModal.locator('.bigButton__big-button--BmG4Q.bigButton__color-tomato--jXOiC');

//   }
// };
// module.exports = DeleteConfirmComponent;
// //note regarding initializing within constructor :
// // Inside the constructor: You need to initialize locators inside the constructor when:
// // You have locators that depend on others (like nested locators, or dynamic locators).
// // You are using locators that need to be resolved based on a parent element (like a modal window or a dynamic table).
// // You want to ensure that locators are initialized only when the page has fully loaded and is ready for interactions.

const BaseComponents = require('./baseComponents');

class DeleteConfirmComponent extends BaseComponents {
    constructor(pageOrBrowser) {
        super(pageOrBrowser);
    }

    get deleteConfirmModal() {
        return this.getLocator('.modalLayout__modal-window--jrhO6.modal-window-animation-enter-done');
    }

    get confirmDeleteButton() {
        return this.getLocator('.bigButton__big-button--BmG4Q.bigButton__color-tomato--jXOiC');
    }
}

module.exports = DeleteConfirmComponent;
