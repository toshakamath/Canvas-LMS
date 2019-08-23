var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });
var singletonDb = require("../Connection");
var controller = {}

controller.fetchProfile = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({
      email: req.body.email
    }).toArray((err, row) => {
      if (err) {
        cb(true,null)
      } else {
        console.log("rows: ", row);
        delete row[0].password;
        console.log("data sent back: ", row);
        cb(null, row);
      }
    })
  })
};
controller.updateProfile = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({
      email: req.body.email
    }).toArray((err, row) => {
      if (err) {
        cb(true,null);
      } else {
        console.log("rows: ", row);
        if (!row.length) {
          console.log("email is not present in the database");
          cb(true,null);
        } else {
          let toUpdate={
              phone: req.body.phone||"",
              aboutme: req.body.aboutme||"",
              city: req.body.city||"",
              company: req.body.company||"",
              school: req.body.school||"",
              hometown: req.body.hometown||"",
              languages: req.body.languages||"",
              gender: req.body.gender||""
          }
          if (req.file && req.file.path) {
            toUpdate["image"]=req.file.path
          }
          db.collection('userdetails').findOneAndUpdate({
            email: req.body.email
          }, {
              $set: toUpdate
            }, {
              returnOriginal: false
            }, (err, row1) => {
              if (err) {
                console.log("error in update query", err);
                cb(true,null);
              } else {
                console.log("row1[0]", row1[0]);
                cb(null, row1[0]);
              }
            })
        }
      }
    })
  })
}

  module.exports = controller;