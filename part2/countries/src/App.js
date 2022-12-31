import React, { useState, useEffect } from "react";
import axios from 'axios'
import Results from './components/Results'

function App() {
  
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  
  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      }).catch(error => console.log(error));
  };
  useEffect(hook, []);

  const handleFormChange = (e) => {
    let filtered = allCountries.filter(country => {
      let name = country.name.common.toLowerCase()
      let input = e.target.value.toLowerCase()
      return name.includes(input)
    })
    let temp = []
    if (e.target.value === "") {
      temp = ["none"]
      setCountries(temp)
      return
    }
    for (let i = 0; i < filtered.length; i++) {
      temp.push([{name: filtered[i].name.common, 
                 capital: filtered[i].capital[0],
                 flag: filtered[i].flag}])
    }
    setCountries(temp)
  }

  return (
    <div>
    <form>
      <input onChange={handleFormChange}></input>
    </form>
    <ul>
    <Results countries={countries}/>
    </ul>
    </div>
  );
}
export default App;