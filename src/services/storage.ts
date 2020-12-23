import { localStorageIsAvailable } from './localStorageAvailable';
import { PersistedToDoItem, ToDoStateUpdate, TodoStatus, UnPersistedToDo } from '../interfaces/interfaces';

const VERSION = '0';
const KEY = `todos_${VERSION}`;

let toDos: PersistedToDoItem[] = []; // InMemory store of todos
const canUseLocalStorage = localStorageIsAvailable();

const initializeToDos = () => {
  if (canUseLocalStorage) {
    try {
      const rawItems = localStorage.getItem(KEY);
      if (rawItems !== null) {
        toDos = JSON.parse(rawItems);
      }
    } catch (err) {
      console.error(err); // Production app this would be tracked and handled better
    }
  }
};

initializeToDos();

export const getToDos = (): PersistedToDoItem[] => {
  return toDos;
};

const getNextId = (): number => {
  const ids = toDos.map((todo) => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  return Math.max(...ids) + 1;
};

const syncToLocalStorage = () => {
  try {
    if (canUseLocalStorage) {
      localStorage.setItem(KEY, JSON.stringify(toDos));
    }
  } catch (err) {
    console.error(err); // Production app again this would be handled better rather than silently fail
  }
};

export const addToDo = (todo: Partial<UnPersistedToDo>): PersistedToDoItem => {
  const persistedToDo: PersistedToDoItem = {
    id: getNextId(),
    state: TodoStatus.Active,
    action: todo.action!,
    priority: todo.priority!,
  };
  toDos = [...toDos, persistedToDo]; // Update in Memory
  syncToLocalStorage();
  return persistedToDo;
};

export const bulkUpdateStatus = (toDosToUpdate: ToDoStateUpdate[]): void => {
  const updates: Partial<PersistedToDoItem>[] = toDosToUpdate.map(({ id, newState: state }) => ({ id, state }));
  const idsToUpdate = updates.map(({ id }) => id);
  toDos = [...toDos].map(({ id, ...rest }) => {
    if (idsToUpdate.includes(id)) {
      return {
        id,
        ...rest,
        ...updates.find((updatedItem) => updatedItem.id === id),
      };
    }

    return {
      id,
      ...rest,
    };
  });
  syncToLocalStorage();
};

export const clear = () => {
  toDos = [];
};
