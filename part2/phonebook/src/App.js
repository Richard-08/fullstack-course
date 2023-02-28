import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState("");

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
      showMessage(`Updated ${exists.name}`, "success");
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    await personService.create(newPerson);
    setPersons([...persons, newPerson]);
    clearFrom();
    showMessage(`Added ${newPerson.name}`, "success");
  }

  function showMessage(msg, type) {
    setMessage(msg);
    setStatus(type);
    setTimeout(() => {
      setMessage(null);
      setStatus("");
    }, 3000);
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
      const newData = persons.filter((item) => item.id !== person.id);
      personService
        .remove(person.id)
        .then(() => {
          setPersons(newData);
          showMessage(`Deleted ${person.name}`, "success");
        })
        .catch(() => {
          setPersons(newData);
          showMessage(
            `Information of ${person.name} has already been removed from server`,
            "error"
          );
        });
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
      <Notification
        message={message}
        type={status}
      />
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
