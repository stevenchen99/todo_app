import React from 'react';
import Todo from './Todo.js';

function TodoList({ todos, deleteTodo, updateTodo }) {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
