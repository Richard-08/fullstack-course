import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!newName.trim() || !newPhone.trim()) {
      return;
    }

    let exists = persons.find((person) => person.name === newName);

    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, phone: newPhone }]);
    setNewName("");
    setNewPhone("");
  }

  function handleName(e) {
    setNewName(e.target.value);
  }

  function handlePhone(e) {
    setNewPhone(e.target.value);
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
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        phone={newPhone}
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
