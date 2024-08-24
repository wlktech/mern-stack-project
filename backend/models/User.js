const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

UserSchema.statics.register = async function(name, email, password) {
    let userExist = await this.findOne({email});
    if(userExist){
        throw new Error("User already exists");
    }

    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({
        name, 
        email,
        password : hashedPassword
    });
    return user;
}

UserSchema.statics.login = async function(email, password) {
    let user = await this.findOne({email});
    if(!user){
        throw new Error("User does not exists");
    }
    //compare password
    let isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new Error("Password is wrong!");
    }else{
        return user;
    }
}

module.exports = mongoose.model('User', UserSchema); // 'Receipe' is the name of the collection in the database