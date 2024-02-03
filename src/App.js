import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import TodoFilters from './components/TodoFilters.js';
import ClearCompletedBtn from './components/ClearCompletedBtn.js';
import { useEffect, useState } from 'react';

function App() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then((res) => res.json())
      .then((todos) => setTodos(todos));
  }, []);

  /*** Create Todo ***/
  let addTodo = (todo) => {
    // Create data to server side
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });

    // Update data to client side
    setTodos((prevState) => [...prevState, todo]);
  };

  /*** Delete Todo ***/
  let deleteTodo = (todoId) => {
    // Delete data in server side
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: 'DELETE',
    });
    // Delete data in client side
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  };

  /*** Update Todo ***/
  let updateTodo = (todo) => {
    // Update data in server side
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    // Update data in client side
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id == todo.id) return todo;
        return t;
      });
    });
  };

  /*** Get remaining Todos count ***/
  let remainingCount = todos.filter((t) => !t.completed).length;

  /*** Check All Todos ***/
  let checkAll = () => {
    todos.forEach((t) => {
      t.completed = true;
      updateTodo(t);
    });
  };

  return (
    <div className='todo-app-container'>
      <div className='todo-app'>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        <CheckAllAndRemaining
          remainingCount={remainingCount}
          checkAll={checkAll}
        />
        <div className='other-buttons-container'>
          <TodoFilters />
          <ClearCompletedBtn />
        </div>
      </div>
    </div>
  );
}

export default App;
