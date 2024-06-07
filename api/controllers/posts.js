import db from '../db.js'
import jwt from 'jsonwebtoken'


const createPost = (req, res) => {
  const { title, description, img, date } = req.body
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Unauthenticate user')

  jwt.verify(token, 'secret', (err, userInfo) => {
    if (err) return res.status(403).json('token invalid')

    const q = 'INSERT INTO posts (title, description,img,date,userid) VALUES (?,?,?,?,?)'
    const values = [title, description, img, date, userInfo.id]
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err)
      res.status(200).json('create post success')
    })
  })


}
const getSinglePost = (req, res) => {
  const postId = req.params.id
  const q = 'SELECT posts.id,username,users.img AS userImg,posts.img AS postImg,description,title,date FROM users JOIN posts ON users.id = posts.userid WHERE posts.id = ?'
  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err)
    res.status(200).json(data[0])
  })
}
const getAllPost = (req, res) => {
  const q = 'SELECT * FROM posts'
  db.query(q, (err, data) => {
    if (err) return res.status(500).json('err')
    res.status(200).json(data)
  })

}
const updatePost = (req, res) => {

}
const deletePost = (req, res) => {
  const postId = req.params.id
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Unauthenticate user')

  jwt.verify(token, 'secret', (err, userInfo) => {
    if (err) return res.status(403).json('token invalid')

    const q = 'DELETE FROM posts WHERE id = ? AND userid = ?'
    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json('you can delete only your post')
      res.json('post succesfully delete')
    })
  })




}

export { createPost, getSinglePost, getAllPost, updatePost, deletePost }
