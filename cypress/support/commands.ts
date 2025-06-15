// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
// Cypress.Commands.add('appLogin', (email: string, password: string) => {
//   cy.visit('/auth/login', {
//     onBeforeLoad: (win) => {
//       win.localStorage.clear();
//     },
//     timeout: 60000,
//   });
//   cy.get('input[name="email"]', { timeout: 50000 }).type(email, { delay: 0 });
//   cy.get('input[name="password"]').type(password, { delay: 0 });
//   cy.get('button[type="submit"]').click();
//   cy.get('ui', { timeout: 50000 }).should('be.visible');
// });

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       appLogin(email: string, password: string): Chainable<void>;
//       closeWhatNewDialog(): Chainable<void>;
//     }
//   }
// }
