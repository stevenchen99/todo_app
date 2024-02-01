import React from 'react';
import Todo from './Todo.js';

function TodoList({ todos, deleteTodo }) {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} />
      ))}
    </ul>
  );
}

export default TodoList;
