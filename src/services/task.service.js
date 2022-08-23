const { Types } = require('mongoose');
const Task = require('../models/Task')

exports.getAllTasksByUser=async (req, res)=>{
    const idUser = req.params.idUser
    const tasks = await Task.aggregate([
        {
            $lookup:{
                from:'users',
                localField:'user',
                foreignField:'_id',
                as:'authorTask'
            },
        
        },
        {
            $unwind:'$authorTask'
        },
        {
            $match:{ user:Types.ObjectId(idUser) }
        }
    ]);
    return res.json(tasks)
}
exports.addTask= async(req, res) => {
    try {
        const idUser = req.params.idUser
        const { name, description, completed, level } = req.body
        const task = new Task({ 
            name,
            description, 
            completed, 
            level,
            user:Types.ObjectId(`${idUser}`)
         });
        await task.save()
        return res.json(task);
    } catch (error) {
        return res.json(error)
    }

}
exports.getTaskById= async(req, res) => {
    try {
        const idTask = req.params.id
        const task = await Task.findById(idTask)
        return res.json(task)
    } catch (error) {
        return res.status(400).json({error:"La tarea no existe"})
    }
}
exports.updateTask= async(req, res) => {
    const idTask = req.params.id
    const task = req.body
    await Task.findByIdAndUpdate(idTask, task)

    return res.json({ msg: 'Task updated successfully' })
}
exports.deleteTask= async(req, res) => {
    const idTask = req.params.id
    let task
    await Task.findByIdAndDelete(idTask)

    return res.json({ msg: 'Task deleted successfully' })
}


