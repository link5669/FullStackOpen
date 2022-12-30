const People = ({persons}) => {
    return (
        persons.map(person => 
            <p>{person.name}: {person.number}</p>
          )
    )
}
export default People