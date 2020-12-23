import {PriorityLevel} from '../../src/interfaces/interfaces';
import { PriorityLevelDisplay } from '../../src/interfaces/displays';

export const completeTodoForm = (action: string, priority = PriorityLevel.High) => {
  cy.get('input[name="action"]').type(action).blur();
  cy.get('select[name="priority"]').select(PriorityLevelDisplay.get(priority));
  cy.get('input[type="submit"]').click({ force: true });
};