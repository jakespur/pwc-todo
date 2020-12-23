import React, { useState, createContext } from 'react';
import {
  PersistedToDoItem,
  States,
  ToDoStateUpdate,
  TodoStatus,
  ToDoSummaryCounts,
  UnPersistedToDo,
} from '../interfaces/interfaces';
import { getToDos, addToDo, bulkUpdateStatus } from '../services/storage';
import { groupByStatusAndSummary } from '../mapper/groupByStatusAndSummary';

export type ToDoContextType = {
  currentFilter: States;
  todos: PersistedToDoItem[];
  totals: ToDoSummaryCounts;
  addNewTodo: (todo: Partial<UnPersistedToDo>) => void;
  bulkStatusChange: (updatedToDos: ToDoStateUpdate[]) => void;
  setFilter: (filterOn: States) => void;
};

export const TodoContext = createContext<ToDoContextType | null>(null);

const DEFAULT_FILTER = TodoStatus.Active;

const TodoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const initialTodos = getToDos();
  const { summary, todos: allTodos } = groupByStatusAndSummary(initialTodos);
  const [todos, setTodos] = useState<PersistedToDoItem[]>(allTodos[DEFAULT_FILTER] || []);
  const [totals, setSummaryCounts] = useState<ToDoSummaryCounts>(summary);
  const [currentFilter, changeFilter] = useState<States>(DEFAULT_FILTER);

  const refreshState = () => {
    const todos = [...getToDos()];
    const { summary, todos: allTodos } = groupByStatusAndSummary(todos);
    setSummaryCounts(summary);
    setTodos(allTodos[currentFilter] || []);
  };

  const refreshDisplay = (filterOn: States) => {
    setTodos(allTodos[filterOn] || []);
  };

  const addNewTodo = (todo: Partial<UnPersistedToDo>) => {
    addToDo(todo);
    refreshState();
  };

  const bulkStatusChange = (updatedToDos: ToDoStateUpdate[]) => {
    bulkUpdateStatus(updatedToDos);
    refreshState();
  };

  const setFilter = (filterOn: States) => {
    changeFilter(filterOn);
    refreshDisplay(filterOn);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        currentFilter,
        totals,
        addNewTodo,
        bulkStatusChange,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
