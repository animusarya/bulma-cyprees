/* eslint-disable no-undef */

// TODO: First of all open two terminals
// TODO: In first terminal run command :-  yarn cypress:start
// TODO: In Second terminal run command :-  yarn cypress:open

/// <reference types="cypress" />

context('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/create-account');
  });

  it('create account with email', () => {
    cy.get('.first-name').type('sourav').should('have.value', 'sourav');
    cy.get('.last-name').type('kumar').should('have.value', 'kumar');
    cy.get('.email').type('sourav@4u').should('have.value', 'sourav@4u');
    cy.get('.password').type('987456').should('have.value', '987456');
    cy.get('.signup-button').click();
  });
});
