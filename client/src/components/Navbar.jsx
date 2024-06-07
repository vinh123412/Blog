import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/Logo.png'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)


  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt=""></img>
          </Link>
        </div>
        <div className="link">
          <img alt="" src={currentUser?.img}></img>
          <p>{currentUser?.username}</p>
          {currentUser ? (<p onClick={logout}>Logout</p>) : (<Link to="/login" className="link" style={{ color: 'white' }}>Login</Link>)}
          <p>
            <Link className="link" to="/write">Write</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar