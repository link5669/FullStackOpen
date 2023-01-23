import { createAnecdote } from '../reducers/anecdoteReducer'
const NewAnecdote = ({dispatch}) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        console.log(event.target)
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </>
    )
}

export default NewAnecdote