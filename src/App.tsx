import TodoProvider from './context/todoContext';
import { ToDo } from './containers/ToDo/ToDo';

function App() {
  return (
    <TodoProvider>
      <ToDo />
    </TodoProvider>
  );
}

export default App;
