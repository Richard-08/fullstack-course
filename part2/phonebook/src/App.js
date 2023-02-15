import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      return;
    }

    let exists = persons.find((person) => person.name === newName);

    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  }

  function handleName(e) {
    setNewName(e.target.value);
  }

  function handlePhone(e) {
    setNewNumber(e.target.value);
  }

  function handleFilter(e) {
    setFilter(e.target.value);
  }

  const filtered_persons = () => {
    let search = filter.toLowerCase();
    return persons.filter((person) =>
      person.name.toLowerCase().includes(search)
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        phone={newNumber}
        handleName={handleName}
        handlePhone={handlePhone}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered_persons()} />
    </div>
  );
};

export default App;
