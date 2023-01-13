import Toggleable from './Toggleable'

const Blog = ({ blog, like, deleteBlog }) => (
  <div>
    {blog.title}
    <Toggleable buttonLabel={'Show Info'}>
      {blog.author}
      <br/>
      {blog.url}
      <br/>
      Likes: {blog.likes}
      <br/>
      <button onClick={() => deleteBlog(blog.id)}>Delete</button>
      <button onClick={() => like(blog.id)}>like</button>
    </Toggleable>
  </div>
)

export default Blog