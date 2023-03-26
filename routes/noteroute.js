const express = require("express");

const { NotesModel } = require("../model/schemaNotes");
var jwt = require("jsonwebtoken");
const notesRouter = express();

notesRouter.post("/", async (req, res) => {
  try {
      const notes = new NotesModel(req.body);
      await notes.save();
      res.send("Note has been added please check");
   
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
notesRouter.get("/", async (req, res) => {
  const token = req.headers.authorization
const decoded = jwt.verify(token,"shhhhh")
  try {
    if(decoded){
      console.log(decoded.userId)
    const note = await NotesModel.find({"UserId":decoded.userId});
    console.log(note);
    res.send(note);
  }
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
notesRouter.patch("/update/:id", async (req, res) => {
  const  id = req.params.id
  const data = req.body;
  console.log(data,id)
  try {
    await NotesModel.findByIdAndUpdate({ _id: id }, data);

    res.send(`note has been updated`);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
notesRouter.delete("/delete/:id", async (req, res) => {
  const  id = req.params.id
  console.log("id",id)
  try {
    await NotesModel.findByIdAndDelete({ _id: id });
    res.send(`note has been deleted`);
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
module.exports = { notesRouter };
