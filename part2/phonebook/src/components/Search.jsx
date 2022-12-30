const Search = ({handleSearchChange}) => {
    return (
        <form>
        <h3>Search by name</h3>
        <input onChange={handleSearchChange}></input>
      </form>
    )
}
export default Search