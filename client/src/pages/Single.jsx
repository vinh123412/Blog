import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import moment from 'moment'

const Single = () => {
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [post, setPost] = useState({})

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`)
        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [id])

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="single">
      <div className="container">
        <div className="postImg">
          <img src={`../upload/${post.postImg}`} alt=""></img>
        </div>
        <div className="content">
          <div className="user">
            <div className="userProfile">
              {post.userImg && <div className="userImg">
                <img src={post.userImg} alt=""></img>
              </div>}
              <div className="userInfo">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
              </div>
            </div>
            {currentUser?.username === post.username && <div className="edit">
              <Link to="/write?edit=2" state={post}>
                <button>update</button>
              </Link>
              <button onClick={handleDelete}>delete</button>
            </div>}

          </div>
          <div className="detail">
            <h1>{post.title}</h1>
            <p>{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single
