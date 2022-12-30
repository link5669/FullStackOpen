const Course = ({course}) => {
    return (
        course.parts.map(part => 
          <li key={part.id}>
            <h2>{part.name}</h2>
            <p>Number of exercises: {part.exercises}</p>
          </li>)
    );
  };

export default Course