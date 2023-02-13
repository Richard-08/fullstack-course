import React from "react";

export default function Filter({ filter, handleFilter }) {
  return (
    <div>
      <input value={filter} onChange={handleFilter} />
    </div>
  );
}
