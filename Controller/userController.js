
const User=require("../models/User");
const bcrypt=require("bcrypt")
//error  handling
//intigrate views
// authentication- jsonwebtoken

const register =async (req,res)=>{
const {email,password} = req.body;
if(!email || !password){
  return  res.status(400).json({sucess:false,msg:"provode neccesary information"})
}
//email has already been registered
const userExists= await User.findOne({email})
if(userExists){
    return res.status(400).json({sucess:false,msg:"Email already exist"})
}
//protect user info-hashing alogrithms
const salt = await bcrypt.genSalt();
const hashedpassword = await bcrypt.hash(password,salt)
    //make sure they provide  email and passwor
    //email hasent been registered
    //project user info

    //create the user

    try {
      const user = await User.create({email,password:hashedpassword}) 
      res.status(201).json({sucess:true, data:user}) 
    } catch (error) {
      console.log(error);  
      res.status(500).json({sucess:false,msg:error})
    }

}

const login = async(req,res)=>{
    const {email,password} = req.body;
   if(!email || !password){
    return res.status(400).json({sucess:false,msg:"please provide necessary information"})
   }
    //email and password 

    //user has  regiseterd
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({sucess:false,msg:"please go and sign up"})
    }
    //provide the correct details, email and password
    const authenticated=user.email===email&&(await bcrypt.compare( password, user.password));
    if(authenticated){
        user.password=" "
        return res.status(200).json({sucess:true,data:user})
    }else{
        return res.status(401).json({sucess:false,msg:"Invalid email or password"})
    }
}

module.exports={
    register,
    login
}