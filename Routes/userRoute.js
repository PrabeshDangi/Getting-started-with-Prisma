const express=require('express')
const router=express.Router()
const {signup}=require('../controllers/usercontrollers')

router.route('/signup').post(signup)

module.exports=router