import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Notification from './components/Notification'

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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const login = async (event) => {
    event.preventDefault()
    const userInfo = await loginService.login(username, password)
      .catch(error => { 
        setNotificationMsg('Invalid username or password')
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

  const handleTitleChange = (event) => { 
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => { 
    setAuthor(event.target.value)
  }

  const handleURLChange = (event) => { 
    setURL(event.target.value)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const result = await blogService.create(newBlog, token)
    setBlogs(blogs.concat(newBlog))
    setNotificationMsg(`New blog posted! ${newBlog.title} by ${newBlog.author}`)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 5000)
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
        setBlogs(result)
      }
      fetchData()
    }
  }, [token])

  if (user === '') {
    return (
      <>
      <Notification message={notificationMsg}/>
        <Login
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
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
      {blogs.map(blog =>
        <Blog blog={blog} />
      )}
      <h2>add new blog</h2>
      <form>
        <input onChange={handleTitleChange} type="text" placeholder="Title" />
        <input onChange={handleAuthorChange} type="text" placeholder="Author" />
        <input onChange={handleURLChange} type="text" placeholder="URL" />
        <button onClick={createNewBlog}>submit</button>
      </form>
    </div>
    )
  }
}

export default App
