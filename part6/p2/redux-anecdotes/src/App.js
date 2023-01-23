import { useDispatch } from 'react-redux'
import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'

const App = () => {
  const dispatch = useDispatch()

  return (
    <div>
      <Anecdotes dispatch={dispatch}/>
      <NewAnecdote dispatch={dispatch}/>
    </div>
  )
}

export default App