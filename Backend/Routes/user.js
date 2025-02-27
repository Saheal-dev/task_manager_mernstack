const express = require("express");
const Router = express.Router();
const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign Up API======
Router.post('/sign-in', async (req, res) => {
  try {
    const {username} = req.body;
    const {email} = req.body;
    const existingUser = await User.findOne({username : username});
    const existingEmail = await User.findOne({email:email});
    if(existingUser){
        return res.status(400).json({message: "User already exists"});
    }
    else if(username.length <4){
        return res.status(400).json({message: "Username must be at least 4 characters long"});
    }
    if(existingEmail){
        return res.status(400).json({message: "Email already exists"});
    }
    const hashPass = await bcrypt.hash(req.body.password, 10);

    newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass
    });

    await newUser.save();
    return res.status(200).json({message: "Sign-IN successfully"});
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({message: "Internal server error"});
  }
})


// Log _in API======
Router.post('/log-in', async (req, res) => {
  try {
    const {username} = req.body;
    const {password} = req.body;
    const existingUser = await User.findOne({username : username});
    if(!existingUser){
        return res.status(400).json({message: "Invalid User"});
    }
    bcrypt.compare(password, existingUser.password, (err, data) => {
        if(data){
        const authClaims =[{name:username},{jti: jwt.sign({}, "tcmTM")}];
         const token= jwt.sign({authClaims}, "tcmTM", {expiresIn: "2d"});
         res.status(200).json({id: existingUser._id, token: token});   
        }
        else{
            return res.status(400).json({message: "Invalid credentials"});
        }
    })



}catch{
    return res.status(400).json({message: "Internal server error"});
}
})


module.exports = Router;
