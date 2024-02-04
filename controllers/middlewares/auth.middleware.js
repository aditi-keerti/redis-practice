const {redisClient}=require('./redis.middleware');
const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token) return res.status(401).json({mesg:"Provide Token"});
    jwt.verify(token,'redis',(err,user)=>{
        if(err) return res.status(401).json({error:err});
        req.user=user;
        redisClient.get(token,(redisErr,reply)=>{
            if(redisErr){
                console.log(`error checking token in Redis:${redisErr}`);
                return res.sendStatus(500);
            }
           next();
        })
    })
}

module.exports={
    auth
}
