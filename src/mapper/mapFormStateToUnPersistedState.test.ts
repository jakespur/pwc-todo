import { mapFormStateToUnPersistedState } from './mapFormStateToUnPersistedState';
import { FormState, FormFields } from '../components/Form/interfaces';
import { PriorityLevel } from '../interfaces/interfaces';

describe('mapFormStateToUnPersistedState', () => {
  it('should convert form model to unpersisted model', () => {
    const formValues: FormState = {
      [FormFields.action]: 'Add Accessibility',
      [FormFields.priority]: PriorityLevel.High.toString(),
    };
    expect(mapFormStateToUnPersistedState(formValues)).toEqual({
      action: 'Add Accessibility',
      priority: PriorityLevel.High,
    });
  });
});
