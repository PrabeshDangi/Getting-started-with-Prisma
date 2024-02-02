const express=require('express')
const { getAllPosts, createPost, deletePost, updatePost } = require('../controllers/postcontrollers')
const router=express.Router()
const isLoggedIn=require('../middlewares/isloggedIn')

router.route('/post/getall').get(getAllPosts)
router.route('/post/create').post(isLoggedIn,createPost)
router.route('/post/delete/:id').delete(isLoggedIn,deletePost)
router.route('/post/update/:id').put(isLoggedIn,updatePost)


module.exports=router