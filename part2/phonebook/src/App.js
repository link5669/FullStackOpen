import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '609-111-1111' }
  ]) 
  const [allPersons, setAllPersons] = useState([
    { name: 'Arto Hellas', number: '609-111-1111' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    let newObj = {name: newName, number: newNumber}
    let flag = false
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        console.log(newName, persons[i].name)
        flag = true
      }
    }
    if (!flag) {
      setAllPersons(persons.concat(newObj))
      setPersons(persons.concat(newObj))
    } else {
      alert(`${newObj.name} is already present!`)
    }
  }
  
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  
  const handleSearchChange = (e) => {
    setPersons(allPersons.filter(person => {
      let temp = person.name.toLowerCase();
      let temp2 = e.target.value.toLowerCase();
      return temp.includes(temp2)
    }));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <h3>Search by name</h3>
        <input onChange={handleSearchChange}></input>
      </form>
      <form onSubmit={addPerson}>
        <h3>Add person</h3>
        <div>
          name: <input 
          onChange={handleNameChange}
          value={newName}
          />
          number: <input 
          onChange={handleNumberChange}
          value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p>{person.name}: {person.number}</p>
      )}
    </div>
  )
}

export default App