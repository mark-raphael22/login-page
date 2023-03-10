const Users=require('../models/user')
const bcrypt=require('bcrypt')



const handleErrors=(err)=>{
    //err messages and errors codes- 11000
    let errors={email:"", password:"",};
    if(err.code === 11000){
        errors.email='Email is already in use'
        return errors
    }
    if (err.message==="users not registerd yet"){
    return errors
    }
    if(err.message==='invalid email or password'){
        errors.password = "Invalid Email or password"
        return errors

    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message;
        })
    }    
    return errors

}

const getregisteredpage=(req,res)=>{
    res.render('signup')
}

const getloginpage=(req,res)=>{
    res.render('login')
}

const getdashboard=(req,res)=>{
    res.render('dashboard')
}

const register=async(req, res)=>{
const {email, password}=req.body
try {
    //protect user info
    //create the user on the database
    const user = await Users.create({email,password})
        res.status(201).json({success:true,data:user})
} catch (error) {
    const errors=handleErrors(error);
    res.status(400).json({success:false,errors})
    //handle errors in the catch block 
}
}

const Login=async(req, res)=>{
    const{email, password}=req.body;
   try {
    if(!email || !password){
        return  res.status(404).json({sucess: false, message:"please provide neccesary information"})
    }
    const user= await Users.findOne({email})
    if(user){
        const authenticated = await bcrypt.compare(password,user.password);
        if(authenticated){
            return res.status(200).json({success: true,data:user})
        }
        throw Error('invalid email or password')
    }
    throw Error("users not registerd yet")

   } catch (error) {
    const errors=handleErrors(error);
    res.status(400).json({success:false, errors})
   }
}

module.exports={
    register,
    Login,
    getregisteredpage,
    getloginpage,
    getdashboard
}