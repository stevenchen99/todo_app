import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  let [title, setTitle] = useState('');

  const { v4: uuidv4 } = require('uuid');
  const guid = uuidv4();

  let handleSubmit = (e) => {
    e.preventDefault();
    // Add data
    let todo = {
      id: guid,
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}

export default TodoForm;
