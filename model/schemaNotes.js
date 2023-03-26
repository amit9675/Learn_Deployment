const mongoose = require("mongoose") 
 const NotesSchema = mongoose.Schema({
    title:String,
    about:String,
    subject:String,
    UserId:String,
 })
 const NotesModel = mongoose.model("Notes",NotesSchema)
module.exports = { NotesModel}