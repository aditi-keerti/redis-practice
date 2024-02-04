const mongoose=require('mongoose');

const taskSchema=mongoose.Schema({
    title:String,
    description:String
},{
    versionKey:false
})
const TaskModel=mongoose.model('task',taskSchema);

module.exports={
    TaskModel
}
