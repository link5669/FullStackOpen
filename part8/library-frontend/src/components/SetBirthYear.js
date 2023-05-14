import { useState } from 'react'

const SetBirthYear = (props) => {
  const [year, setYear] = useState('')
  const [name, setName] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    props.updateYear( { variables: { name: name, year: parseInt(year)}})
    console.log('set year')

    setYear('')
    setName('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          author name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear