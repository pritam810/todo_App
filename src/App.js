import "./App.css"

// Importing required components --->>
import TodoForm from "./form/Form";
import TodoList from "./form/List";

// inporting custom context from dataContext.js --->>
import CustomDataContext from './dataContext';

function App() {
  return (
    <CustomDataContext>
    <div className="App">
      <div className='container'>
        <h2>Create your Todo-List</h2>
      <TodoForm />
      <TodoList />
      </div>
    </div>
    </CustomDataContext>
  );
}

export default App;