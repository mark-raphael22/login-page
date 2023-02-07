require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5010
// const userRouter =require("./route/userRoute")
const newRouter=require("./route/newUserrouter")
mongoose.set("strictQuery",true);
const notfound = require("./middlware/notfoundroute")
//middleware
app.use (express.json());


//routes and error in routes
app.use(newRouter)


//error routes
app.use(notfound)

const startserver =async()=>{
    try {
        await mongoose.connect(process.env.MON_URI)
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        }) 
    } catch (error) {
        
    }

}
startserver();
