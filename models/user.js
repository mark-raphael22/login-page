//email- string uno


const {isEmail}= require('validator')
const mongoose = require('mongoose');
const Schema=mongoose.Schema
const bcrypt=require('bcrypt');

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
        minlength:[7,"this  minimum password lenght  is 7"],
    },
},{timestamps:true})
//function that protect our users info  before we save them
//we are using a function expression an a (this) global style
userShema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password= await bcrypt.hash(this.password,salt);
    next();

})

module.exports = mongoose.model( "user",userShema)