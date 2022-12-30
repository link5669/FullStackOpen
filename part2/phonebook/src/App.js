import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    let newObj = {name: newName}
    let flag = false
    for (let i = 0; i < persons.length; i++) {
      console.log(newName, persons[i].name)
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
  
  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          onChange={handleChange}
          value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p>{person.name}</p>
      )}
    </div>
  )
}

export default App