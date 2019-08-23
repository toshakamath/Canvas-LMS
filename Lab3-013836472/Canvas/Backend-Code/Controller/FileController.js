var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");

controller.displayFiles = function (req, res) {
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
        res.status(200).send(row);
      } else {
        res.status(200).send(row);
      }
    }, (err)=>{
      res.status(400);
    })
  })
}

controller.fileUpload = function (req, res, next) {
  singletonDb.getInstance().then(db=>{
    db.collection('userdetails').find({
      email:req.body.email
    })
    .toArray()
    .then((row)=>{
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        res.status(400);
      } else {
        db.collection('fileuploads').insertOne({
          email: req.body.email,
          courseid: req.body.courseid,
          filepath: req.file.path
        })
        .then((row)=>{
          console.log("data inserted into the database");
            res.status(200).send(row[0]);
        }, (err)=>{
          res.status(400);
        })
      }
    }, (err)=>{
      console.log("error in query storing");
      res.status(400);
    })
  })
}

module.exports = controller;