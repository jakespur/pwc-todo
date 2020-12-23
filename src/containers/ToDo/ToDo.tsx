import { useContext } from 'react';
import { TodoContext, ToDoContextType } from '../../context/todoContext';
import { Form, Listing, Filter } from '../../components';
import { TodoStatus } from '../../interfaces/interfaces';

export const ToDo = () => {
  const { totals, todos, currentFilter, addNewTodo, setFilter, bulkStatusChange } = useContext(
    TodoContext,
  ) as ToDoContextType;

  const isInActiveState = currentFilter === TodoStatus.Active;

  return (
    <main>
      <header className={'row'}>
        <div className={'column small-12'}>
          <h1 data-testid={'heading'}>ToDo Tracker</h1>
        </div>
      </header>
      <section className={'row'}>
        <div className={'column small-12'}>
          <Form onAddTodo={addNewTodo} />
        </div>
      </section>
      <section className={'row'}>
        <div className={'column small-12'}>
          <Filter currentFilter={currentFilter} onFilterSelected={setFilter} totals={totals} />
        </div>
      </section>
      <section className={'row'}>
        <div className={'column small-12'}>
          <Listing showActions={isInActiveState} todos={todos} onChangeState={bulkStatusChange} />
        </div>
      </section>
    </main>
  );
};
