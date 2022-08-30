const {Schema , model, Types} = require('mongoose')

const taskSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    level:{
        type:String,
        default:"NORMAL"
    },
    user:{
        type: Types.ObjectId, ref:'User'
    }
    
},
{
    versionKey:false
})

module.exports= model("Task",taskSchema)
