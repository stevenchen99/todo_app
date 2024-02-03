import React from 'react';

function CheckAllAndRemaining({ remainingCount, checkAll }) {
  return (
    <div className='check-all-container'>
      <div>
        <div className='button' onClick={checkAll}>
          Check All
        </div>
      </div>

      <span>
        {remainingCount} item{remainingCount > 1 ? 's' : ''} remaining
      </span>
    </div>
  );
}

export default CheckAllAndRemaining;
