const { Router } = require('express')
const taskRouter = Router()
const taskService = require('../services/task.service')

taskRouter.get('/:idUser',taskService.getAllTasksByUser)

taskRouter.post('/:idUser', taskService.addTask)

taskRouter.get('/:id', taskService.getTaskById)

taskRouter.put('/:id', taskService.updateTask)

taskRouter.delete('/:id', taskService.deleteTask)
module.exports = taskRouter;