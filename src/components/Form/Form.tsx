import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import { UnPersistedToDo } from '../../interfaces/interfaces';
import { FormErrors, FormState } from './interfaces';
import { validate } from './validate';
import { mapFormStateToUnPersistedState } from '../../mapper/mapFormStateToUnPersistedState';
import { PriorityLevelDisplay } from '../../interfaces/displays';
import styles from './Form.module.scss';

export type ToDoFormProps = {
  onAddTodo(formProps: Partial<UnPersistedToDo>): void;
};

export const Form = ({ onAddTodo }: ToDoFormProps) => {
  const emptyFormState = () => ({
    action: '',
    priority: '',
  });

  const [formState, setFormState] = useState<FormState>(emptyFormState());
  const [errors, setErrors] = useState<string[] | null>(null);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const field = event.target;
    const newState: FormState = {
      [field.name]: field.value,
    };
    setFormState({
      ...formState,
      ...newState,
    });
  };

  const clearForm = () => {
    setFormState(emptyFormState());
  };

  const wipeErrors = () => {
    setErrors(null);
  };

  const showErrors = (fieldErrors: FormErrors) => {
    setErrors(Object.values(fieldErrors!) as string[]);
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    wipeErrors();
    const [formValid, fieldErrors] = validate(formState);
    if (formValid) {
      onAddTodo(mapFormStateToUnPersistedState(formState));
      clearForm();
      return;
    }
    showErrors(fieldErrors);
  };

  return (
    <form data-testid={'addNewTodo'} className={styles.container} onSubmit={onSubmit}>
      <fieldset>
        <legend>Add your Todo</legend>
        {errors && (
          <div data-testid={'formWarning'} className={styles.warningPanel}>
            <h2>Warning</h2>
            <h4>Unable to add your new todo until you correct the following:</h4>
            {errors!.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <ul>
          <li>
            <label htmlFor={'action'}>
              <span>Action</span>
              <span className={styles.required}>*</span>
            </label>
            <input
              required
              maxLength={50}
              onChange={onFieldChange}
              value={formState.action}
              title={'Please enter an action'}
              placeholder={'Action'}
              type={'text'}
              name={'action'}
            />
          </li>
          <li>
            <label htmlFor={'action'}>
              <span>Priority</span>
              <span className={styles.required}>*</span>
            </label>
            <select
              value={formState.priority}
              title={'Please select the todo priority'}
              required
              onChange={onFieldChange}
              name={'priority'}
            >
              <option value={''}>Please select...</option>
              {Array.from(PriorityLevelDisplay).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </li>
          <li>
            <input onClick={onSubmit} type={'submit'} value={'Add new todo'} />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};
