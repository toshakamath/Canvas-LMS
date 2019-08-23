var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");

controller.displayGrades = function (req, cb) {
  singletonDb.getInstance().then(db => {
    console.log(req.body);
    db.collection('submissions').find({
      courseid: req.body.courseid,
      studentemail: req.body.email
    })
      .sort({
        submissionid: -1
      })
      .toArray()
      .then((row) => {
        console.log(row)
        let assignmentid = [];
        let grade = [];
        for (let i = 0; i < row.length; i++) {
          assignmentid.push(row[i].assignmentid);
          grade.push(row[i].grade);
        }
        db.collection('assignmentdetails').find({
          assignmentid: {
            $in: assignmentid
          }
        })
          .toArray()
          .then((row1) => {
            console.log("row1: ", row1)
            for (var i = 0; i < row1.length; i++) {
              row1[i].additional = [];
              for (var j = 0; j < row.length; j++) {
                if (parseInt(row1[i].assignmentid) === parseInt(row[j].assignmentid)) {
                  row1[i].additional.push(row[j]);
                }
              }
            }
            console.log(JSON.stringify(row1, null, 2));
            cb(null, row1);
          }, (err) => {
            console.log("error in query", err);
            cb(true,null)
          })
      }, (err) => {
        cb(true,null)
      })
  })
}

  module.exports = controller;