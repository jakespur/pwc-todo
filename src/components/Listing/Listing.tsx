import React, { useState } from 'react';
import { ActionStates, PersistedToDoItem, ToDoStateUpdate, TodoStatus } from '../../interfaces/interfaces';
import { PriorityLevelDisplay } from '../../interfaces/displays';
import styles from './Listing.module.scss';

export type ListingProps = {
  showActions: boolean;
  todos: PersistedToDoItem[];
  onChangeState(itemsToUpdate: ToDoStateUpdate[]): void;
};

export const Listing = ({ todos, onChangeState, showActions = false }: ListingProps) => {
  const [itemActions, setActions] = useState<ToDoStateUpdate[]>([]);

  const toggleItemState = (action: ActionStates, id: number) => {
    const match: ToDoStateUpdate | undefined = itemActions.find((item) => item.id === id && item.newState === action);
    if (match) {
      setActions(itemActions.filter((item) => item.id !== match.id));
    } else {
      const itemToInsert = { id, newState: action };
      setActions([...itemActions, itemToInsert]);
    }
  };

  const bulkUpdateToDoState = (updateToAction: ActionStates) => {
    const itemsToUpdate = itemActions.filter(({ newState }) => newState === updateToAction);
    if (itemsToUpdate.length > 0) {
      onChangeState(itemsToUpdate);
    }
  };

  return (
    <table data-testid={'todo-listing'} className={styles.container}>
      <thead>
        <tr>
          <th data-testid={'actionHeading'}>Action</th>
          <th data-testid={'priorityHeading'}>Priority</th>
          {showActions && (
            <>
              <td>
                <button
                  data-testid={'markAsCompletedAction'}
                  aria-label={`Mark selected todos as completed`}
                  onClick={() => bulkUpdateToDoState(TodoStatus.Completed)}
                >
                  Complete
                </button>
              </td>
              <td>
                <button
                  data-testid={'markAsDeletedAction'}
                  aria-label={`Mark selected todos for soft delete`}
                  onClick={() => bulkUpdateToDoState(TodoStatus.Deleted)}
                >
                  Delete
                </button>
              </td>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr data-testid={`todoRow-${todo.id}`} key={todo.id}>
            <td>{todo.action}</td>
            <td>{PriorityLevelDisplay.get(todo.priority)}</td>
            {showActions && (
              <>
                <td>
                  <input
                    data-testid={`mark-complete-${todo.id}`}
                    type={'checkbox'}
                    onChange={() => toggleItemState(TodoStatus.Completed, todo.id)}
                  />
                </td>
                <td>
                  <input
                    data-testid={`mark-delete-${todo.id}`}
                    type={'checkbox'}
                    onChange={() => toggleItemState(TodoStatus.Deleted, todo.id)}
                  />
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
