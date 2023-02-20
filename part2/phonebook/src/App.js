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

  async function handleSubmit(event) {
    event.preventDefault();

    if (!newName.trim() || !newNumber.trim()) {
      return;
    }

    let exists = persons.find((person) => person.name === newName);

    if (exists) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        await personService.update(exists.id, {
          name: exists.name,
          number: newNumber,
        });
        setPersons(
          persons.map((person) => {
            if (person.id === exists.id) {
              return {
                ...person,
                number: newNumber,
              };
            }

            return person;
          })
        );
      }
      clearFrom();
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    await personService.create(newPerson);
    setPersons([...persons, newPerson]);
    clearFrom();
  }

  function clearFrom() {
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

  function handleDelete(person) {
    const confirm = window.confirm(`Delete ${person.name}?`);
    if (confirm) {
      personService.remove(person.id);
      setPersons(persons.filter((item) => item.id !== person.id));
    }
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
      <Persons
        persons={filtered_persons()}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
