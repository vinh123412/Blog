import { createContext } from "react"
import { useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", inputs)
    setCurrentUser(res.data)
  }

  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout")
    setCurrentUser(null)
  }

  const googleLogin = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/google/success")
    setCurrentUser(res.data)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/google/success")
        if (res.status === 401) throw new Error("Failed to authenticate")
        setCurrentUser(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getUser()
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, googleLogin }}>{children}</AuthContext.Provider>
  )
}

