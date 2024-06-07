import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Google from '../images/google.png'
import Github from '../images/github.png'
import Facebook from '../images/facebook.png'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })

  const [err, setError] = useState(null)

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs(prev => (
      { ...prev, [e.target.name]: e.target.value }
    ))
  }

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate('/')
    } catch (error) {
      setError(error.response.data)
    }
  }

  const handleGoogleLogin = async () => {
    window.open('http://localhost:5000/api/auth/google', '_self')
  };
  const handleGithubLogin = async () => {
    window.open('http://localhost:5000/api/auth/github', '_self')
  };
  const handleFacebookLogin = async () => {
    window.open('http://localhost:5000/api/auth/facebook', '_self')
  };

  //test
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="username" name="username" onChange={handleChange} />
        <input type="password" placeholder="password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <p>Dont have an account? <Link to="/register">Register</Link></p>
      </form>
      <button className="loginButton google" onClick={handleGoogleLogin}>
        <img src={Google} alt=""></img>
        Login with Google
      </button>
      <button className="loginButton github" onClick={handleGithubLogin}>
        <img src={Github} alt=""></img>
        Login with Github
      </button>
      <button className="loginButton facebook" onClick={handleFacebookLogin}>
        <img src={Facebook} alt=""></img>
        Login with Facebook
      </button>
    </div>
  )
}

export default Login
