var jwt = require("jsonwebtoken");
// const express =  require("express")
const authorisation = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(`token`,token)
    if (token) {
    jwt.verify(token, "shhhhh", function (err, decoded) {
      if (decoded) {
        req.body.UserId = decoded.userId
        console.log(decoded)
        next();
      } else {
        res.send({ msg: err.message });
      }
    });
  } else {
    res.send({"err":`Plz provide login details`});
  }
};
module.exports = { authorisation };
