import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery } from '@apollo/client'

const ALL_PERSONS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const personsResult = useQuery(ALL_PERSONS)
  const booksResult = useQuery(ALL_BOOKS)

  if (personsResult.loading || booksResult.loading ) {
    return <p>loading...</p>
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors data={personsResult.data.allAuthors} show={page === 'authors'} />

      <Books data={booksResult.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
