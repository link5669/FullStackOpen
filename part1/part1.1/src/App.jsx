const Content = ({part1, exercises1}) => {
  return (
  <p>
      {part1} {exercises1}
    </p>
  );
};

const Header = ({course}) => {
  return (
      <p>
          <h1>{course}</h1>
      </p>
  );
};

const Total = ({exercises1, exercises2, exercises3}) => {
  return (
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  );
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}></Header>
      <Content part1={part1} exercises1={exercises1}></Content>
      <Content part1={part2} exercises1={exercises2}></Content>
      <Content part1={part3} exercises1={exercises3}></Content>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}></Total>
    </div>
  )
}

export default App