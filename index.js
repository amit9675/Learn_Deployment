const express =  require("express")
const {connection} = require("../backend/db")
const { authorisation } = require("./routes/auth")
const { notesRouter } = require("./routes/noteroute")
const { userRouter } = require("./routes/userroute")
const cors = require("cors")
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use(authorisation)
app.use("/notes",notesRouter)
app.listen(process.env.Port,async(req,res)=>{
    try {
        await connection
        console.log(`server running`)
    } catch (error) {
        console.log(`errppor`)
    }
})
