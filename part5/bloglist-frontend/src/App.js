import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const login = async (event) => {
    event.preventDefault()
    setUser(await loginService.login(username, password).username)
    window.localStorage.setItem('username', username)
  }
  
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('username')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
    const loggedIn = window.localStorage.getItem('username')
    if (loggedIn) {
      setUser(loggedIn)
    }
  }, [])

  if (user === null) {
    return (
      <>
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
      <h2>blogs</h2>
      <button onClick={logout}>log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )
  }
}

export default App
