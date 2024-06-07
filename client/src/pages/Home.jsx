import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts')
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])


  return (
    <div className="Home">
      <div className="posts">
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="image">
                <img src={`../upload/${post.img}`} alt="" />
              </div>
              <div className="detail">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{post.description}</p>
                <button>Learn More</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
