const Course = ({course}) => {
    let total = course.parts.reduce((partialSum, a) => partialSum + a.exercises, 0);
    return (
        <p><b>total of {total} exercises</b></p>
    );
  };

export default Course