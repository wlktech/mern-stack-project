const User = require("../models/User");
const mongoose = require("mongoose");
const createToken = require("../helpers/createToken");


const AuthController = {
    register : async (req,res) => {
        try{
            let {name, email, password} = req.body;
            let user = await User.register(name, email, password);
            let token = createToken(user._id);
            res.cookie("jwt", token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
            res.json({user, token});
        }catch(err){
            res.status(400).json({msg: err.message});
        }
    }, 
    login : async (req,res) => {
        try{
            let {email, password} = req.body;
            let user = await User.login(email, password);
            let token = createToken(user._id);
            res.cookie("jwt", token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
            res.json({user, token});
        }catch(err){
            res.status(400).json({msg: err.message});
        }
    },
    getUser: async (req,res) => {
        try{
            let user = await User.getUser(req.user._id);
            res.json(user);
        }catch(err){
            res.status(400).json({msg: err.message});
        }
    },
    logout : async (req,res) => {
        return res.cookie("jwt", "", {maxAge: 1}).json({msg: "Logout success"});
    },
}

module.exports = AuthController;