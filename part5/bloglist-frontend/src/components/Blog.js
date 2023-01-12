import Toggleable from "./Toggleable"

const Blog = ({blog}) => (
  <div>
    {blog.title}
    <Toggleable buttonLabel={'Show Info'}>
      {blog.author}
      <br/>
      {blog.url}
    </Toggleable>
  </div>  
)

export default Blog