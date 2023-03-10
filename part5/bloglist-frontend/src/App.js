import { useState, useEffect, createRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import NewBlog from './components/NewBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)

  const blogFormRef = createRef()

  const login = async (event) => {
    event.preventDefault()
    const userInfo = await loginService.login(username, password)
      .catch(error => {
        setNotificationMsg('Invalid username or password', error)
        setTimeout(() => {
          setNotificationMsg(null)
        }, 5000)
      })

    setToken(userInfo.token)
    setUser(userInfo.username)
    window.localStorage.setItem('username', userInfo.username)
    window.localStorage.setItem('token', userInfo.token)
  }

  const logout = () => {
    setUser('')
    setToken('')
    window.localStorage.removeItem('username')
    window.localStorage.removeItem('token')
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    await blogService.create(newBlog, token)
    setBlogs(blogs.concat(newBlog).sort((a,b) => b.likes - a.likes))
    blogFormRef.current.toggleVisibility()
    setNotificationMsg(`New blog posted! ${newBlog.title} by ${newBlog.author}`)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 5000)
  }

  const like = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user
    }
    await blogService.addLike(token, newBlog)
      .catch(error => {console.log(error)})
    const newBlogs = await blogService.getAll(token)
    setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
      await blogService.deleteBlog(token, id)
        .catch(error => {console.log(error)})
      const newBlogs = await blogService.getAll(token)
      setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
    }
  }

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    const localToken = window.localStorage.getItem('token')
    if (username) {
      setUser(username)
      setToken(localToken)
    }
  }, [])

  useEffect(() => {
    if (token !== '') {
      const fetchData = async () => {
        const result = await blogService.getAll(token)
        setBlogs(result.sort((a,b) => b.likes - a.likes))
      }
      fetchData()
    }
  }, [token])

  if (user === '') {
    return (
      <>
        <Notification message={notificationMsg}/>
        <Login
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          login={login}>
        </Login>
      </>
    )
  } else {
    return (
      <div>
        <Notification message={notificationMsg}/>
        <h2>blogs</h2>
        <button onClick={logout}>log out</button>
        {blogs.map(blog => <>
          <Blog like={like} deleteBlog={deleteBlog} blog={blog} />
        </>
        )}
        <Toggleable buttonLabel={'New blog'} ref={blogFormRef}>
          <NewBlog setTitle={setTitle} setAuthor={setAuthor} setURL={setURL} createNewBlog={createNewBlog}/>
        </Toggleable>
      </div>
    )
  }
}

export default App
