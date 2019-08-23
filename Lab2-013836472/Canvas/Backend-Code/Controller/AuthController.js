var singletonDb = require("../Connection");
var generateToken = require("../tokens").generateToken;
var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

const bcrypt = require("bcrypt");
const saltRounds = 10;

var controller = {}
controller.signupUser = function (req, res) {
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({
      email: req.body.email
    }).toArray((err, row) => {
      if (err) {
        res.status(400);
      }
      else {
        console.log("row: ", row.length);
        if (row.length) {
          res.end(
            "User details already present in the database. Please login"
          );
        }
        else {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            db.collection('userdetails').insertOne({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              type: req.body.type
            }, (err, row1) => {
              if (err) {
                res.status(400);
              }
              else {
                res.status(200).send({});
              }
            })
          });
        }
      }
    })
  })
};
controller.loginUser = function (req, res) {
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({
      email:req.body.email
    }).toArray((err,row)=>{
      //  //select type from userdetails where email=email
      if (err) {
        res.status(400)
      } else {
        console.log("row: ", row.length);
        if (!row.length) {
          res.status(400);
          res.end(
            "User details not present in the database. Please signup"
          );
        } else {
          bcrypt.compare(req.body.password, row[0].password, function (err,result) {
            if (result) {
              delete row[0].password;
              var token = generateToken(row[0].email);
              var type = row[0].type;
              console.log("type: ", type)
              var returnobj = { userdata: row[0], token: token, type: type };
              res.status(200).send(returnobj);
            } else {
              res.status(400).send({});
            }
          });
        }
      }
    })
})
};

module.exports = controller;