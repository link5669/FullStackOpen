const Course = ({course}) => {
    let sum = 0;
    course.parts.map(part => {
        sum += part.exercises
        }
      )
    return (
        <p><b>total of {sum} exercises</b></p>
    );
  };

export default Course