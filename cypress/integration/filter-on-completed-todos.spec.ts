import { completeTodoForm } from '../support/completeTodoForm';

describe('Adding a new todo', () => {
  beforeEach(() => {
    cy.visit('/');
    completeTodoForm('Add e2e tests');
    completeTodoForm('Check accessibility');
    cy.get('[for="Active"]').contains('span', 'Active (2)');
    cy.get('tbody').find('tr').should('have.length', 2);
  });

  describe('Marking e2e as completed', () => {
    beforeEach(() => {
      cy.get('[data-testid=mark-complete-1]').click({ force: true });
      cy.get('[data-testid=markAsCompletedAction]').click({ force: true });
      cy.get('[for="Completed"]').contains('span', 'Completed (1)');
      cy.get('[for="Completed"]').click({ force: true });
    });

    describe('switching filter to completed', () => {
      it('should now only show the completed todos', () => {
        cy.get('tbody').find('tr').should('have.length', 1);
        cy.get('table')
          .contains('td', 'Add e2e tests');
        cy.get('table')
          .contains('td', 'High');
      });
    });
  });
});