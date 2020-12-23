import { completeTodoForm } from '../support/completeTodoForm';

describe('Adding a new todo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the following form fields with no defaults', () => {
    cy.get('input[name="action"]').should('be.visible');
    cy.get('input[name="action"]').should('have.value', '');
    cy.get('select[name="priority"]').should('be.visible');
    cy.get('select[name="priority"]').should('have.value', '');
  });

  describe('Sad path', () => {
    describe('Submitting incomplete form', () => {
      it('should display a warning message back to the customer that the form is incomplete', () => {
        cy.get('input[type="submit"]').click({ force: true });
        cy.get('form')
          .should('contain', 'Warning');
        cy.get('form')
          .should('contain', 'Please enter in an action');
        cy.get('form')
          .should('contain', 'Please select the priority level');
      });
    });
  });

  describe('Happy path', () => {
    describe('Submitting a completed form', () => {
      it('should add the todo to the table and clear the form', () => {
        cy.get('input[name="action"]').should('have.value', '');
        cy.get('select[name="priority"]').should('have.value', '');
        completeTodoForm('Add e2e tests');
        cy.get('table')
          .contains('td', 'Add e2e tests');
        cy.get('table')
          .contains('td', 'High');
      });
    });
  });
});