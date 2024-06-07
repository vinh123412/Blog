import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [err, setError] = useState(null)

  const handleChange = (e) => {
    setInputs(prev => (
      { ...prev, [e.target.name]: e.target.value }
    ))
  }

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs)
      navigate('/login')
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="username" name="username" onChange={handleChange} />
        <input type="email" placeholder="email" name="email" onChange={handleChange} />
        <input type="password" placeholder="password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Register
