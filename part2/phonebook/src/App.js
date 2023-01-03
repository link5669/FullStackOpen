import { useEffect, useState } from 'react'
import AddPerson from './components/AddPerson'
import People from './components/People'
import Search from './components/Search'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [allPersons, setAllPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    phonebookService.getAll().then(response =>  {
      let jsonData = response.persons
      let dataArr = []
      for (let i = 0; i < jsonData.length; i++) {
        dataArr.push({name: jsonData[i].name, number: jsonData[i].number, id: jsonData[i].id})
      }
      setPersons(dataArr)
      setAllPersons(dataArr)
    })
  };

  useEffect(hook, []);
  
  const addPerson = (e) => {
    e.preventDefault()
    let newObj = [{name: newName, number: newNumber, id: (persons.length + 1)}]
    let flag = false
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        flag = true
      }
    }
    if (!flag) {
      setAllPersons(persons.concat(newObj))
      phonebookService.create({name: newName, number: newNumber, id: (persons.length + 1)})
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

  const deletePerson = (person) => {
    var filtered = persons.filter(function(value, index, arr){ 
      return value.name !== person.name;
    });
    setPersons(filtered)
    var filteredAll = allPersons.filter(function(value, index, arr){ 
      return person.name !== person.name;
    });
    setAllPersons(filteredAll)
    phonebookService.deleteObj(person)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search handleSearchChange={handleSearchChange}/>
      <AddPerson 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <People persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App