const Receipe = require("../models/Receipe");
const mongoose = require("mongoose");
const paginate = require("../services/Paginate");

const ReceipeController = {
    index : async (req,res) => {
        let limit = 6;
        let page = req.query.page || 1;
        let receipes = await Receipe
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({"createdAt" : -1});

        let total = await Receipe.countDocuments();
        let links = paginate(total, limit, page);

        res.json({
            "message" : "Receipes retrieved.",
            "data" : receipes,
            links
        });
    }, 
    store : async (req,res) => {
        try{
            const {title, description, ingredients} = req.body;
            const receipe = await Receipe.create({
                title, 
                description,
                ingredients
            });
            res.json(receipe);
        }catch(err){
            res.status(400).json({msg: err.message});
        }
        
    },
    show : async (req,res) => {
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg: "Not a valid ID."});
            }
            let receipe = await Receipe.findById(id);
            if(!receipe){
                return res.status(400).json({msg: "Receipe not found."});
            }
            return res.json(receipe);
        }catch(err){
            res.status(500).json({msg: "Internal Server Error."});
        }
    },
    update : async(req,res) => {
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg: "Not a valid ID."});
            }
            let receipe = await Receipe.findByIdAndUpdate(id, {
                ...req.body
            });
            if(!receipe){
                return res.status(400).json({msg: "Receipe not found."});
            }
            let updatedReceipe = await Receipe.findById(id); // to get the updated receipe
            return res.json({msg: "Receipe updated.", updatedReceipe});
        }catch(err){
            res.status(500).json({msg: "Internal Server Error."});
        }
    },
    destroy : async (req,res) => {
        try{
            let id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({msg: "Not a valid ID."});
            }
            let receipe = await Receipe.findByIdAndDelete(id);
            if(!receipe){
                return res.status(400).json({msg: "Receipe not found."});
            }
            return res.json({msg: "Receipe deleted."});
        }catch(err){
            res.status(500).json({msg: "Internal Server Error."});
        }
    }
}

module.exports = ReceipeController;