import React, { useState } from 'react';

export default function Todo({ todo, deleteTodo, updateTodo }) {
  let [isEdit, setIsEdit] = useState(false);
  let [title, setTitle] = useState(todo.title);

  let updateTodoHandler = (e) => {
    e.preventDefault();

    let updatedTodo = {
      id: todo.id,
      title,
      completed: todo.completed,
    };

    updateTodo(updatedTodo);
    setIsEdit(false);
  };

  let checkboxHandler = () => {
    let updatedTodo = {
      id: todo.id,
      title,
      completed: !todo.completed,
    };

    updateTodo(updatedTodo);
  };

  return (
    <li className='todo-item-container'>
      <div className='todo-item'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={checkboxHandler}
        />
        {!isEdit && (
          <span
            className={`todo-item-label ${
              todo.completed ? 'line-through' : ''
            }`}
            onDoubleClick={() => setIsEdit(true)}
          >
            {todo.title}
          </span>
        )}
        <form onSubmit={updateTodoHandler}>
          {isEdit && (
            <input
              type='text'
              className='todo-item-input'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </form>
      </div>
      <button className='x-button' onClick={() => deleteTodo(todo.id)}>
        <svg
          className='x-button-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </li>
  );
}
