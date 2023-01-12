import Toggleable from "./Toggleable"

const Blog = ({blog, like}) => (
  <div>
    {blog.title}
    <Toggleable buttonLabel={'Show Info'}>
      {blog.author}
      <br/>
      {blog.url}
      <br/>
      Likes: {blog.likes}
      <button onClick={() => like(blog.id)}>like</button>
    </Toggleable>
  </div>  
)

export default Blog