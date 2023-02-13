import React from "react";

export default function PersonForm({
  name,
  phone,
  handleName,
  handlePhone,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={handleName} />
      </div>
      <div>
        number: <input value={phone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
