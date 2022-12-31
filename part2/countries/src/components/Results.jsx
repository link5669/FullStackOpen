const Results = ({countries}) => {
    console.log(countries)
    if (countries.length > 10) {
        return "Too many to list!"
    } else if (countries.length === 1) {
        console.log(countries[0])
        return (<div><h1>{countries[0][0].name}</h1><br/><p>capital: {countries[0][0].capital}</p><h1>{countries[0][0].flag}</h1></div>)
    }
    if (countries[0] == "none") {
        return "Enter a value!"
    }
    return (
        countries.map(country => <li>{country[0].name}</li>)
    )
}
export default Results