const Login = ({ handleUsernameChange, handlePasswordChange, login }) => {
  return (
    <>
      <form>
        <input onChange={handleUsernameChange} type="text" placeholder="Username" />
        <input onChange={handlePasswordChange} type="password" placeholder="Password" />
      </form>
        <button onClick={login}>Log In</button>
    </>
  );
}

export default Login