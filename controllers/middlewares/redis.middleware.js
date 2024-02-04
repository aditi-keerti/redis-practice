const Redis = require("ioredis")
require('dotenv').config();

const redisClient = new Redis({
    port: process.env.redis_port,
    host: process.env.redis_host,
    password: process.env.redis_pass
});

module.exports={
    redisClient
}