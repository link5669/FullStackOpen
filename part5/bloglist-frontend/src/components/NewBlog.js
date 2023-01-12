const NewBlog = ({setTitle, setAuthor, setURL, createNewBlog}) => {
    return (
        <>
            <h2>add new blog</h2>
            <form>
                <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
                <input onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author" />
                <input onChange={(e) => setURL(e.targ.etvalue)} type="text" placeholder="URL" />
                <button onClick={createNewBlog}>submit</button>
            </form>
      </>
    )
    }
    export default NewBlog