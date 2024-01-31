import React from "react";

function TodoFilters() {
  return (
    <div>
      <button className="button filter-button filter-button-active">All</button>
      <button className="button filter-button">Active</button>
      <button className="button filter-button">Completed</button>
    </div>
  );
}

export default TodoFilters;
