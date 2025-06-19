// const BasePage = require("./basePage");

// class logInPage extends BasePage {
//   constructor (page){
//     super(page);
//   }
//   loginInput = this.page.locator(".inputOutside__input--Ad7Xu[placeholder = 'Login']");
//   passwordInInput = this.page.locator(".inputOutside__input--Ad7Xu[type = 'password']");
//   logInButton = this.page.locator(".loginForm__login-button-container--KT9g6");
// };
// module.exports = logInPage;

const BasePage = require("./basePage");

class LogInPage extends BasePage {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); // Initialize the BasePage with the context (Playwright page or WDIO browser)
    }

    // **Selectors**: Updated to use `getLocator` for framework compatibility.
    loginInput = this.getLocator(".inputOutside__input--Ad7Xu[placeholder='Login']"); // Login input field
    passwordInput = this.getLocator(".inputOutside__input--Ad7Xu[type='password']"); // Password input field
   
    logInButton = this.getLocator(".loginForm__login-button-container--KT9g6"); // Login button
}

module.exports = LogInPage;