import { useSelector } from 'react-redux'
const Anecdotes = ({ dispatch }) => {
  const anecdotes = useSelector(state => state)
  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ).sort((a, b) => b.props.children[1].props.children[1] - a.props.children[1].props.children[1])}
    </>
  )
}

export default Anecdotes