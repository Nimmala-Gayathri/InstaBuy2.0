const express = require("express")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");
const { postProduct, getProduct, deleteProduct, editProduct } = require("../controller/userController");

require('dotenv').config();


const userRouter = express.Router()
// const jwt_token = "gayathri"
userRouter.get('/sellerget',getProduct)
userRouter.post('/sellerpost',postProduct)
userRouter.put('/edit-prod/:id',editProduct)
userRouter.delete('/deleteprod/:id',deleteProduct)

userRouter.post('/login',async(req,res) =>{
    const {email, password}  = req.body;;
    
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invaild email or password"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password or email"})
        }

        const token = jwt.sign({id: user._id},process.env.JWT_TOKEN,{ expiresIn:"3h"})
        res.send({
            token,
            user:{
                id:user._id,
                name: user.name,
                email: user.email,
            },
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})
userRouter.post('/signup',async(req,res) =>{
    const {name,email,password} = req.body
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })
         await newUser.save()
console.log(process.env.JWT_TOKEN)
         const token = jwt.sign({id: newUser._id, email:newUser.email} ,process.env.JWT_TOKEN,{expiresIn:"2h"})
         res.status(201).json({
            token,
            user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email
            }
          });
    } catch (error) {
        // console.error("Error during signup:", error); 
        res.status(500).json({error:"server error"})
    }
})


module.exports = userRouter