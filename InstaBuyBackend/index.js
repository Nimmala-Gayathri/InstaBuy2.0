const express = require("express")
const connectDB = require("./config/db")
const User = require("./models/userModel")
const userRouter = require('./routes/userRouter')
const bodyParser = require("body-parser")
const cors = require('cors')
// const productDB = require("./config/db")
const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/instabuy",userRouter)
// app.get("/", async(req,res)=>{
//   const data = await new User({
//    name : "gayathri",
//    email : "gayathri@gmail.com",
//    password : "gayathri"
//   }).save();

//   res.send({
//     data
//   })
// })

app.listen(7000,() =>{
    console.log("server is listening on port 7000")
})
connectDB()
// productDB()
//i3sxHT1c7cKYuhJc