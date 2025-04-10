const BasePage = require("./basePage");

class logInPage extends BasePage {
  constructor (page){
    super(page);
  }
  loginInput = this.page.locator(".inputOutside__input--Ad7Xu[placeholder = 'Login']");
  passwordInInput = this.page.locator(".inputOutside__input--Ad7Xu[type = 'password']");
  logInButton = this.page.locator(".loginForm__login-button-container--KT9g6");
};
module.exports = logInPage;