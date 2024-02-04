const redis = require('redis');
const redisClient=redis.createClient();
redisClient.on('error',(err)=>{
    console.log(`Redis error:${err}`);
})

module.exports={
    redisClient
}