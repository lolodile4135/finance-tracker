const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//register nerw user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        //cresting token
        const token = jwt.sign({ userId: newuser._id }, process.env.JWT_SECRET);
        res.status(200).json({ newuser, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


//loginnuser
router.post('/login',async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        
        if(!user){
            return res.status(400).json({error:'Invalid login credentials'});
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
           return  res.status(400).json({error:'Invalid login credentials'});
           
            
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET);
        console.log(token);
        
        res.status(200).json({user,token})
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports=router;