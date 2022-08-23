const { Router } = require('express')
const userService = require('../services/user.service')
const userRouter = Router()


userRouter.get('/', userService.getAllUsers)

userRouter.post('/register', userService.registerUser)

userRouter.post('/login',userService.loginUser)

userRouter.get('/:id', userService.getUserById)

module.exports = userRouter;