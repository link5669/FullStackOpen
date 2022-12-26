import React, { useState } from 'react'

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [reviewHistory, setAll] = useState([])
  
  function avg() {
    let avg = 0;
    for (let i = 0; i < reviewHistory.length; i++) {
      if (reviewHistory[i] === 'G') {
        avg += (1/reviewHistory.length)
      } else if (reviewHistory[i] === 'B') {
        avg -= (1/reviewHistory.length)
      }
    }
    return avg
  }

  function pos() {
    if (reviewHistory.length === 0) {
      return 0
    }
    let numPos = 0;
    for (let i = 0; i < reviewHistory.length; i++) {
        if (reviewHistory[i] === 'G') {
          numPos += 1
        }
    }
    return numPos/reviewHistory.length * 100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => {setGood(good + 1); setAll(reviewHistory.concat('G'))}} />
      <Button name="neutral" handleClick={() => {setNeutral(neutral + 1); setAll(reviewHistory.concat('N'))}}/>
      <Button name="bad" handleClick={() => {setBad(bad + 1); setAll(reviewHistory.concat('B'))}}/>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {reviewHistory.length}</p>
      <p>average {avg()}</p>
      <p>positve {pos()}%</p>
    </div>
  )
}

export default App