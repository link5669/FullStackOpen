const AddPerson = ({handleNameChange, newName, handleNumberChange, newNumber, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
            <h3>Add person</h3>
            <div>
                name: 
                <input 
                onChange={handleNameChange}
                value={newName}
                />
                number: 
                <input 
                onChange={handleNumberChange}
                value={newNumber}
                />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}
export default AddPerson
