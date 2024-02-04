const express = require('express');
const {connection}=require('./db');
const {userRoute}=require('./controllers/routes/user.routes');
const {taskRoute}=require('./controllers/routes/task.routes');

const app = express()
app.use(express.json());
app.use('/users',userRoute);
app.use('/todos',taskRoute);
app.get('/',(req,res)=>{
    res.send("Home")
})
   
app.listen(8080,async()=>{
    try{
         await connection
         console.log("server is running at port 8080");
    }catch(err){
        console.log(err);
    }
    
})