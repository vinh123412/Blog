import React from 'react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'

const Write = () => {
  const state = useLocation().state
  const navigate = useNavigate()

  const [value, setValue] = useState(state?.description || '');
  const [title, setTitle] = useState(state?.title || '')
  const [img, setImg] = useState(null)


  const upload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', img)
      const res = await axios.post('http://localhost:5000/api/upload', formData)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imgUrl = await upload()
    state ? await axios.put(`http://localhost:5000/api/posts/${state.id}`, { title, description: value, img: img ? imgUrl : '' }) : await axios.post('http://localhost:5000/api/posts', { title, description: value, img: img ? imgUrl : '', date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') })
    navigate('/')
  }

  return (
    <div className="add">
      <div className="write">
        <input placeholder="Blog Title" value={title} onChange={e => setTitle(e.target.value)}></input>
        <div className="edit-container">
          <ReactQuill className="edit" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="publish">
        <div className="detail">
          <h1>Publish</h1>
          <input type="file" id="file" style={{ display: "none" }} onChange={e => setImg(e.target.files[0])}></input>
          <label htmlFor="file">Upload Image</label>
        </div>
        <div className="the-button">
          <button onClick={handleSubmit}>Publish</button>
          <button>Save as a draft</button>
        </div>
      </div>
    </div>
  )
}

export default Write
