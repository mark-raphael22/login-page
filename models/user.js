//email- string uno


const {isEmail}= require('validator')
const mongoose = require('mongoose');
const Schema=mongoose.Schema

const userShema= new Schema({
    email:{
        type:String,
        unique:[true,'this email as been registered'],
        required:[true,'please provide a  email'],
        validate:[isEmail,'please enter a valid email']
        
    },
    password:{
        type:String,
        required:[true,"please provide a password"],
        Minlength:[11,"this  minimum password lenght  is 10"],
    },
},{timestamps:true})

module.exports = mongoose.model( "user",userShema)