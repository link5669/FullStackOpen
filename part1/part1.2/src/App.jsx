import React, { useState } from 'react'

const Statistics = ({good, neutral, bad, reviewHistory}) => {
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
    let numPos = 0;
    for (let i = 0; i < reviewHistory.length; i++) {
        if (reviewHistory[i] === 'G') {
          numPos += 1
        }
    }
    return numPos/reviewHistory.length * 100
  }

  if (reviewHistory.length === 0) {
    return (
      <p>No feedback given</p>
    );
  };
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {reviewHistory.length}</p>
      <p>average {avg()}</p>
      <p>positve {pos()}%</p>
    </div>
  )
}
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => {setGood(good + 1); setAll(reviewHistory.concat('G'))}} />
      <Button name="neutral" handleClick={() => {setNeutral(neutral + 1); setAll(reviewHistory.concat('N'))}}/>
      <Button name="bad" handleClick={() => {setBad(bad + 1); setAll(reviewHistory.concat('B'))}}/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        reviewHistory={reviewHistory}/>
    </div>
  )
}

export default App