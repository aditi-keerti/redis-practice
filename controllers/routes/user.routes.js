const express=require('express');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const {auth}=require('../middlewares/auth.middleware');

const {UserModel}=require('../../models/user.model')
const {redisClient}=require('../middlewares/redis.middleware');


const userRoute=express.Router();
userRoute.use(express.json());
userRoute.post('/register', async (req, res) => {
    const { name, email, pass } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        return res.status(200).json({ mesg: "User already Exists. Please Login!!" });
    }

    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                return res.status(403).json({ error: err });
            }

            const newUser = new UserModel({ name, email, pass: hash });
            await newUser.save();
            res.status(200).json({ mesg: "New user Added", newUser });
        });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, pass } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        bcrypt.compare(pass, user.pass, async (err, result) => {
            if (result) {
                const token = jwt.sign({user},'redis',{expiresIn:'1h'});
                redisClient.setex(token, 3600, 'valid');
                res.status(200).json({msg: "Login Successful!!",token});
            } else {
                res.status(402).json({ error: "Invalid password" });
            }
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


userRoute.post('/logout',auth,(req,res)=>{
    const token=req.header('Authorization');
    redisClient.sadd('blacklisted',token);
    res.status(200).json({msg:"Logout Successfull!!"})
})

module.exports={
    userRoute
}