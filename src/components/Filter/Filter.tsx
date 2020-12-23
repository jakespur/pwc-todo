import React from 'react';
import { States, TodoStatus, ToDoSummaryCounts } from '../../interfaces/interfaces';
import { TodoStatusDisplay } from '../../interfaces/displays';
import styles from './Filter.module.scss';

export type FilterProps = {
  currentFilter: States;
  onFilterSelected(filterOn: TodoStatus): void;
  totals: ToDoSummaryCounts;
};

export const Filter = ({ currentFilter, totals, onFilterSelected }: FilterProps) => {
  return (
    <div
      data-testid={'filter'}
      className={styles.container}
      aria-label={'Filter ToDo items by either Active, Completed and Deleted Status'}
    >
      {Array.from(TodoStatusDisplay).map(([id, label]) => (
        <label key={id} htmlFor={label}>
          <input
            checked={currentFilter === id}
            onChange={() => onFilterSelected(id)}
            type={'radio'}
            id={label}
            name={'filter'}
            value={id}
          />
          <span aria-label={`Click to filter your list by ${label}`}>{`${label} (${totals[id]})`}</span>
        </label>
      ))}
    </div>
  );
};
