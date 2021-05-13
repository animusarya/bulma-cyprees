/* eslint-disable no-undef */

// TODO: First of all open two terminals
// TODO: In first terminal run command :-  yarn cypress:start
// TODO: In Second terminal run command :-  yarn cypress:open

/// <reference types="cypress" />

context('About', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/about');
  });

  it('sign up buttons', () => {
    cy.get('.btn').click();
    cy.get('.sign-button').click();
  });
});
