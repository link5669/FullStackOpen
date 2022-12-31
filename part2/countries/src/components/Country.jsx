import Weather from './Weather'
const Country = ({country}) => {
    if (country.name == "") {
        return;
    }
    return (
        <div>
            <h1>{country[0].name}</h1>
            <br/>
            <p>capital: {country[0].capital}</p>
            <h1>{country[0].flag}</h1>
            <Weather country={country[0].name} city={country[0].capital}/>
        </div>
        )
}
export default Country