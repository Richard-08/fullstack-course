import React from "react";

export default function Persons({ persons, handleDelete }) {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => handleDelete(person)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
