import {useState} from 'react'
import Country from "./Country"

const Results = ({countries}) => {
    const [countryView, setCountryView] = useState({name: "", capital: "", flag: ""})
    if (countries.length > 10) {
        return "Too many to list!"
    } else if (countries.length === 1) {
        return (<Country country={countries[0]}/>)
    } else if (countries[0] === "none") {
        return "Enter a value!"
    }
    return (
        <>
        {countries.map(country => <li>{country[0].name}<button onClick={() => setCountryView(country)}>click</button></li>)}
        <Country country={countryView}/>
        </>
    )
}
export default Results