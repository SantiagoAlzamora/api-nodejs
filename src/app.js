const express = require('express')
const morgan = require('morgan')
const taskRouter = require('./routes/tasks.routes')
const userRouter = require('./routes/users.routes')
const cors = require('cors')
const connectDB = require('./connectionDB')
const verifyToken = require('./auth/validateToken')

const app = express()

require('dotenv').config();

//ConectionDB
connectDB();

//Settings
app.set('port',process.env.port || 3001)

//MIDDLEWARES
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//Routes
app.use('/api/tasks',verifyToken, taskRouter)
app.use('/api/users', userRouter)

module.exports = app;