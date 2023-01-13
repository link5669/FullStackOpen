import Toggleable from './Toggleable'

const Blog = ({ blog, like, deleteBlog }) => (
  <div>
    {blog.title}
    <Toggleable buttonLabel={'Show Info'}>
      {blog.author}
      <br/>
      <div>
        {blog.url}
      </div>
      <br/>
      <div>
        Likes: {blog.likes}
      </div>
      <br/>
      <button onClick={() => deleteBlog(blog.id)}>Delete</button>
      <button onClick={() => like(blog.id)}>like</button>
    </Toggleable>
  </div>
)

export default Blog