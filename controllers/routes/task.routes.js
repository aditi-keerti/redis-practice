const express=require('express');
const {TaskModel}=require('../../models/task.model');
const {auth}=require('../middlewares/auth.middleware');
const taskRoute=express.Router()

taskRoute.post('/add',auth,async(req,res)=>{
    const {title,description}=req.body;
    try{
         const todo=new TaskModel({title,description});
         await todo.save();
         res.status(200).json({mesg:"new todo added",todo}); 
    }catch(err){
        res.status(400).json({error:err});
    }
})

taskRoute.get('/',auth,async(req,res)=>{
    const todos=await TaskModel.find();
    res.status(200).json(todos);
})

taskRoute.put('/:id',auth,async(req,res)=>{
    const {id}=req.params;
    const {title,description}=req.body;
    const updateTodo=await TaskModel.findByIdAndUpdate(id,{title,description},{new:true});
    res.status(200).json(updateTodo);
})
taskRoute.delete('/:id',auth,async(req,res)=>{
    const {id}=req.params;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({mesg:"deleted todo"});
})

module.exports={
    taskRoute
}