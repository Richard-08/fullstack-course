import React from "react";

export default function Persons({ persons }) {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
