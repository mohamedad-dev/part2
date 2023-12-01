const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person)}>Delete</button>
    </li>
  );
};
const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person key={person.name} person={person} handleDelete={handleDelete} />
      ))}
    </ul>
  );
};
export default Persons;
