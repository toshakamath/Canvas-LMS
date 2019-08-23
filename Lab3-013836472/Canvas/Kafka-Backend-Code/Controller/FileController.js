var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");

controller.displayFiles = function (req, cb) {
  singletonDb.getInstance().then(db=>{
    db.collection('fileuploads').find({
      courseid: req.query.courseid
    })
    .toArray()
    .then((row)=>{
      console.log("rows: ", row);
      if (row.length) {
        delete row[0].password;
        console.log("data sent back: ", row);
        cb(null, row);
      } else {
        cb(true,null);
      }
    }, (err)=>{
      cb(true,null);
    })
  })
}

controller.fileUpload = function (req, cb) {
  singletonDb.getInstance().then(db=>{
    db.collection('userdetails').find({
      email:req.body.email
    })
    .toArray()
    .then((row)=>{
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        cb(true,null)
      } else {
        db.collection('fileuploads').insertOne({
          email: req.body.email,
          courseid: req.body.courseid,
          filepath: req.file.path
        })
        .then((row)=>{
          console.log("data inserted into the database");
            cb(null, row[0]);
        }, (err)=>{
          cb(true,null)
        })
      }
    }, (err)=>{
      console.log("error in query storing");
      cb(true,null)
    })
  })
}

module.exports = controller;