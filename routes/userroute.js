const express = require("express");
// const { UserModel } = require("../model/schema");
const userRouter = express();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/schema");
userRouter.post("/register", async (req, res) => {
  // console.log(req.body);
  const { email, password,location,age,name } = req.body;
  console.log(email)
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      const user = new UserModel({email:email,password: hash,location,age,name });
      await user.save();
      res.send(`Data added`);
    });
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await UserModel.find({email});
    console.log(user)
    if (user) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        //  await user.save()
        var token = jwt.sign({"userId":user[0]._id}, "shhhhh");
        result
          ? res.send({ msg: "Logged in", token: token })
          : res.send({ msg: `Check the credentials` });
      });
    }
  } catch (error) {
    res.send({ msg: "error" });
  }
});
userRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token)
  try {
    jwt.verify(token, "shhhhh", function (err, decoded) {
      decoded
        ? res.send(`Now you can access the data`)
        : res.send({ msg: err.message });
    });
  } catch (error) {
    res.send({ msg: error.messege });
  }
});
module.exports = { userRouter };
