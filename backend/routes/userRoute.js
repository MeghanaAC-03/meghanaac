const express=require('express');
const userRoute=express.Router();
const {loginUser,registerUser}=require('../controllers/userController')

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)

module.exports=userRoute;