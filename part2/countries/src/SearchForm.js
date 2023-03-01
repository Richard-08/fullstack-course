import React from "react";

export default function SearchForm({ search, onInput }) {
  return (
    <form>
      <label htmlFor="search">Find countries</label>
      <input
        id="search"
        placeholder="Country"
        value={search}
        onInput={onInput}
      />
    </form>
  );
}
