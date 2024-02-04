import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import TodoFilters from './components/TodoFilters.js';
import ClearCompletedBtn from './components/ClearCompletedBtn.js';
import { useCallback, useEffect, useState } from 'react';

function App() {
  let [todos, setTodos] = useState([]);
  let [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFilteredTodos(todos);
      });
  }, []);

  /*** Filter Todos ***/
  let filterBy = useCallback(
    (filter) => {
      if (filter === 'All') {
        setFilteredTodos(todos);
      }
      if (filter === 'Active') {
        setFilteredTodos(todos.filter((t) => !t.completed));
      }
      if (filter === 'Completed') {
        setFilteredTodos(todos.filter((t) => t.completed));
      }
    },
    [todos]
  );

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
        if (t.id === todo.id) return todo;
        return t;
      });
    });
  };

  /*** Get remaining Todos count ***/
  let remainingCount = todos.filter((t) => !t.completed).length;

  /*** Check All Todos ***/
  let checkAll = () => {
    // Server Side
    todos.forEach((t) => {
      t.completed = true;
      updateTodo(t);
    });
    // Client Side
    setTodos((prevState) => {
      return prevState.map((t) => {
        return { ...t, completed: true };
      });
    });
  };

  /*** Clear Completed Todos ***/
  let clearCompleted = () => {
    // Server Side
    todos.forEach((t) => {
      if (t.completed) deleteTodo(t.id);
    });
    // Client Side
    setTodos((prevState) => {
      return prevState.filter((t) => {
        return !t.completed;
      });
    });
  };

  return (
    <div className='todo-app-container'>
      <div className='todo-app'>
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        <CheckAllAndRemaining
          remainingCount={remainingCount}
          checkAll={checkAll}
        />
        <div className='other-buttons-container'>
          <TodoFilters filterBy={filterBy} />
          <ClearCompletedBtn clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
