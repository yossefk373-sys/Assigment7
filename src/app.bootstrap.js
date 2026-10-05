import express from "express"
import { connectdb } from "./DB/connnectdb.js"
import userrouter from "./modules/user/user.controller.js"
import noterouter from "./modules/note/note.controller.js"
const app=express()
const port=3000

const bootstrap=async()=>{
    app.use(express.json())

    await connectdb()
    app.use("/user",userrouter)
    app.use("/note",noterouter)






    app.use("/",(req,res,next)=>{
        res.status(200).json("welcome to my app ✔")
    })
    app.listen(port,()=>{
        console.log("server connect success");
        
    })
    app.use("{/*demo}",(req,res,next)=>{
        res.status(500).json(`url:${req.originalUrl}with methode :${req.method} not found`)
    })
}
export default bootstrap