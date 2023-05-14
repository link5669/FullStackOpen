import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useMutation, useQuery } from '@apollo/client'
import { ALL_PERSONS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR } from './queries'
import SetBirthYear from './components/SetBirthYear'

const App = () => {
  const [page, setPage] = useState('authors')
  const personsResult = useQuery(ALL_PERSONS, {
    pollInterval: 2000
    })
  const booksResult = useQuery(ALL_BOOKS)
  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ {query: ALL_BOOKS }]
  })

  const [ updateYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_PERSONS }]
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
        <button onClick={() => setPage('set birth year')}>set birth year</button>
      </div>

      <Authors data={personsResult.data.allAuthors} show={page === 'authors'} />

      <Books data={booksResult.data.allBooks} show={page === 'books'} />

      <NewBook addBook={addBook} show={page === 'add'} />

      <SetBirthYear updateYear={updateYear} show={page === 'set birth year'}/>
    </div>
  )
}

export default App