import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage } from '../pages'

const userNameLogin = Cypress.env('userNameLogin');
const userPasswordLogin = Cypress.env('userPasswordLogin');

Given(/^User open Login page$/, function() {
  cy.visit('/login')
});
When(/^User login with user validate user information$/, function() {
  cy.get(loginPage.userNameInp).type(userNameLogin);
  cy.get(loginPage.passwordInp).type(userPasswordLogin);
  cy.get(loginPage.loginBtn).click();
});
Then(/^User redirect to home page$/, function() {
  cy.get(loginPage.loginSuccessLbl).should('contain.text', 'You logged into a secure area!');
});
