import { PriorityLevel, UnPersistedToDo } from '../interfaces/interfaces';
import { FormState } from '../components/Form/interfaces';

export const mapFormStateToUnPersistedState = (formState: FormState): Partial<UnPersistedToDo> => {
  const todoAction: string = formState['action'] || '';
  return {
    action: todoAction,
    priority: parseInt(formState.priority!, 10) as PriorityLevel,
  };
};
