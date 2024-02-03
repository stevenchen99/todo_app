import React from 'react';

function ClearCompletedBtn({ clearCompleted }) {
  return (
    <div>
      <button className='button' onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
}

export default ClearCompletedBtn;
