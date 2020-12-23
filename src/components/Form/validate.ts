import { FormErrors, FieldLevelErrors, FormFields, FormState } from './interfaces';
import { isEmpty } from '../../utils/isEmpty';

export const validate = ({ action, priority }: FormState): [boolean, FormErrors] => {
  const errors: FieldLevelErrors = {};

  if (action === '') {
    errors[FormFields.action] = 'Please enter in an action';
  }

  if (priority === '') {
    errors[FormFields.priority] = 'Please select the priority level';
  }

  if (!isEmpty(errors)) {
    return [false, errors];
  }

  return [true, null];
};
