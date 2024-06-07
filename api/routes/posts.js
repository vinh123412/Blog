import express from 'express'
import { createPost, getSinglePost, getAllPost, updatePost, deletePost } from '../controllers/posts.js'

const router = express.Router()


//create, get single, get all, delete, update

router.post('/', createPost)
router.get('/:id', getSinglePost)
router.get('/', getAllPost)
router.delete('/:id', deletePost)
router.put('/:id', updatePost)

export default router