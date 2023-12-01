import Filter from "./components/filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import { useEffect, useState } from "react";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState("");

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFound = persons.find((person) => person.name === newName);
    if (isFound) {
      if (
        window.confirm(
          `${isFound.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = {
          ...isFound,
          number: newNumber,
        };
        personService
          .update(isFound.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === isFound.id ? response : person
              )
            );
            setSuccessMessage(`Updated ${response.name}'s number`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${isFound.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
            setPersons(persons.filter((person) => person.id !== isFound.id));
          });
      }
    } else {
      const createdPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(createdPerson).then((response) => {
        setPersons([...persons, response]);
        setSuccessMessage(`Added ${response.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete  ${person.name}?`)) {
      personService.deletePerson(person.id).then((response) => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
