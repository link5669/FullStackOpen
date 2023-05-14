import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useMutation, useQuery } from '@apollo/client'
import { ALL_PERSONS, ALL_BOOKS, CREATE_BOOK } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const personsResult = useQuery(ALL_PERSONS, {
    pollInterval: 2000
    })
  const booksResult = useQuery(ALL_BOOKS)
  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ {query: ALL_BOOKS }]
  })

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

      <NewBook addBook={addBook} show={page === 'add'} />
    </div>
  )
}

export default App
