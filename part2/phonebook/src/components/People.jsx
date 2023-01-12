const People = ({persons, deletePerson}) => {
  return (
    persons.map(person => 
      <>
        <p key={person.id}>{person.name}: {person.number}</p>
        <button onClick={() => deletePerson(person)}>delete</button>
      </>
    )
  )
}
export default People