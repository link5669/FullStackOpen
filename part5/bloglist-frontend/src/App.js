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
      {blogs.map(blog =>
        <Blog blog={blog} />
      )}
      <h2>add new blog</h2>
      <form>
        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" />
        <input onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author" />
        <input onChange={(e) => setURL(e.targ.etvalue)} type="text" placeholder="URL" />
        <button onClick={createNewBlog}>submit</button>
      </form>
      <p>{title}</p>
    </div>
    )
  }
}

export default App
