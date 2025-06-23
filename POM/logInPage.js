const BasePage = require("./basePage");

class LogInPage extends BasePage {
    constructor(pageOrBrowser) {
        super(pageOrBrowser); // Initialize the BasePage with the context (Playwright page or WDIO browser)
    }

    // **Selectors**: Updated to use `getLocator` for framework compatibility.
    loginInput = this.getLocator(".inputOutside__input--Ad7Xu[placeholder='Login']"); 
    passwordInput = this.getLocator(".inputOutside__input--Ad7Xu[type='password']");
    logInButton = this.getLocator(".loginForm__login-button-container--KT9g6");
}

module.exports = LogInPage;