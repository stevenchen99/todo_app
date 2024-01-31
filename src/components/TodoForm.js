import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  let [title, setTitle] = useState('');

  let handleSubmit = (e) => {
    e.preventDefault();
    // Add data
    let todo = {
      id: Math.random(),
      title,
      completed: false,
    };

    addTodo(todo);

    // Clear data in input box
    setTitle('');
  };

  return (
    <form action='#' onSubmit={handleSubmit}>
      <input
        type='text'
        className='todo-input'
        placeholder='What do you need to do?'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
}

export default TodoForm;
