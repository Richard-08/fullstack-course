import React from "react";

export default function Persons({ persons }) {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} - {person.phone}
        </li>
      ))}
    </ul>
  );
}
