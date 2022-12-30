import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
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