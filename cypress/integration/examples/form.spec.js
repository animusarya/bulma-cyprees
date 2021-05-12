/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('login with name and email', () => {
    cy.get('.is-first-input')
      .type('dvbangar8@gmail.com')
      .should('have.value', 'dvbangar8@gmail.com');

    cy.get('.is-second-input')
      .type('dharmveer-bangar')
      .should('have.value', 'dharmveer-bangar');
    cy.get('.login-button').click();
  });
});
