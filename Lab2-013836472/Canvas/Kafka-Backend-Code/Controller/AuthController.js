var singletonDb = require("../Connection");
var generateToken = require("../tokens").generateToken;
var faker = require('faker');

const bcrypt = require("bcrypt");
const saltRounds = 10;

var controller = {}
controller.signupUser = function (req, cb) {
  console.log("cjeck")
  singletonDb.getInstance().then(db => {
    // for (let i = 0; i < 20; i++) {
      // let e=faker.internet.email();
      // let n=faker.name.findName();
      db.collection('userdetails').find({
        email: req.body.email     //faker : e
      }).toArray((err, row) => {
        if (err) {
          cb(true, null)
        }
        else {
          console.log("row: ", row.length);
          if (row.length) {
            cb(true, null)
          }
          else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {   //req.body.password > faker: faker@123
              db.collection('userdetails').insertOne({
                name: req.body.name,  //req.body.name > faker : n
                email: req.body.email,  //req.body.email > faker : e
                password: hash,
                type: req.body.type      //req.body.type
              }, (err, row1) => {
                if (err) {
                  cb(true, null)
                }
                else {
                  cb(null, {})
                  // res.status(200).send({});
                }
              })
            });

          }
        }
      })
    // }
  })
};

controller.loginUser = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({
      email:req.body.email
    }).toArray((err,row)=>{
      //  //select type from userdetails where email=email
      if (err) {
        cb(true,null)
      } else {
        console.log("row: ", row.length);
        if (!row.length) {
          cb(true,null);
        } else {
          bcrypt.compare(req.body.password, row[0].password, function (err,result) {
            if (result) {
              delete row[0].password;
              var token = generateToken(row[0].email);
              var type = row[0].type;
              console.log("type: ", type)
              var returnobj = { userdata: row[0], token: token, type: type };
              cb(null,returnobj)
            } else {
              cb(true)
            }
          });
        }
      }
    })
})
};

module.exports = controller;