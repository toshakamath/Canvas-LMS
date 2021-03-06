var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");
var uuid = require("uuid");

controller.createAssignment = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({
      email: req.body.em
    }).toArray()
      .then((row) => {
        console.log("rows: " + row.length);
        if (!row.length) {
          console.log("Teacher is not present. Please sign up.");
          cb(true,null);
        } else {
          db.collection('assignmentdetails').insertOne({
            email: req.body.em,
            assignmenttitle: req.body.assignmenttitle,
            assignmentdesc: req.body.assignmentdesc,
            duedate: req.body.duedate,
            courseid: req.body.courseid,
            points: req.body.points,
            assignmentid: uuid.v1()
          })
            .then((row) => {
              console.log("data inserted into the database");
              cb(null,row[0]);
            }, (err) => {
              cb(true,null);
            })
        }
      }, (err) => {
        cb(true,null);
      })
  })
};

controller.displayAssignment = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('assignmentdetails').find({
      courseid: req.body.courseid
    })
      .toArray()
      .then((row) => {
        cb(null,row);
      }, (err) => {
        cb(true,null);
      })
  })
};

controller.teacherViewAssignments = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('submissions').find({
      courseid: req.body.courseid,
      assignmentid: req.body.assignmentid,
      submissionid: req.body.submissionid
    })
      .sort({
        submissionid: -1
      })
      .toArray()
      .then((row) => {
        console.log("data sent back: ", row);
        let emails = [];
        for (let i = 0; i < row.length; i++) {
          emails.push(row[i].studentemail);
        }
        console.log("row: ", row);
        console.log("emails: ", emails);
        db.collection('userdetails').find({
          email: {
            $in: emails
          }
        })
          .toArray()
          .then((row1) => {
            console.log("row1: ", row1)
            for (var i = 0; i < row1.length; i++) {
              row1[i].submissions = [];
              for (var j = 0; j < row.length; j++) {
                if (row1[i].email === row[j].studentemail) {
                  //row[j].studentname=[];
                  //row[j].studentname.push(emails[i]);
                  row1[i].submissions.push(row[j]);
                }
              }
            }
            console.log(JSON.stringify(row1, null, 2));
            cb(null,row1);
          }, (err) => {
            cb(true,null);
          })
      }, (err) => {
        cb(true,null);
      })
  })
};

controller.teacherGradeAssignments = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('submissions').findOneAndUpdate({
      studentemail: req.body.email,
      courseid: req.body.courseid,
      assignmentid: req.body.assignmentid,
      submissionid: req.body.submissionid
    },{
      $set:{
        grade:req.body.grade
      }
    })
      .then((row) => {
        cb(null,row);
      }, (err) => {
        cb(true,null);
      })
  })
};

controller.teacherViewSubmissions = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('submissions').find({
      courseid: req.body.courseid,
      assignmentid: req.body.assignmentid
    }).sort({
      submissionid: -1
    }).toArray().then((row) => {
      console.log("data sent back: ", row);
      let emails = [];
      for (let i = 0; i < row.length; i++) {
        emails.push(row[i].studentemail);
      }
      console.log("row: ", row);
      console.log("emails: ", emails);
      db.collection('userdetails').find({
        email: {
          $in: emails || []
        }
      }).toArray().then((row1) => {
        console.log("row1: ", row1)
        for (var i = 0; i < row1.length; i++) {
          row1[i].submissions = [];
          for (var j = 0; j < row.length; j++) {
            if (row1[i].email === row[j].studentemail) {
              row1[i].submissions.push(row[j]);
            }
          }
        }
        console.log(JSON.stringify(row1, null, 2));
        cb(null, row1);
      }, (err) => {
        cb(true,null);
      })
    }, (err) => {
      cb(true,null);
    })
  })
};

controller.assignmentDetails = function (req, cb) {
  singletonDb.getInstance().then(db => {
    console.log(req.body);
    db.collection('submissions').find({
      courseid: req.body.courseid,
      studentemail: req.body.email,
      assignmentid: req.body.assignmentid
    })
      .sort({
        submissionid: -1
      })
      .toArray()
      .then((row) => {
        console.log("data sent back: ", row[0], req.body.assignmentid);
        db.collection('assignmentdetails').find({
          assignmentid: (row[0] || {}).assignmentid || req.body.assignmentid
        })
          .toArray()
          .then((row1) => {
            console.log("row1: ", row1)
            for (var i = 0; i < row1.length; i++) {
              row1[i].additional = [];
              if (parseInt(row1[i].assignmentid) === parseInt((row[0] || {}).assignmentid)) {
                row1[i].additional.push(row[0]);
              }
              // }
            }
            console.log(JSON.stringify(row1, null, 2));
            cb(null, row1);
          }, (err) => {
            cb(true,null);
          })
      }, (err) => {
        cb(true,null);
      })
  })
};

controller.submitAssignment = function (req, cb) {
  singletonDb.getInstance().then(db => {
    db.collection('userdetails').find({
      email: req.body.email
    })
      .toArray()
      .then((row) => {
        console.log("rows: ", row);
        if (!row.length) {
          console.log("email is not present in the database");
          cb(true,null);
        } else {
          console.log("inside else");
          db.collection('submissions').insertOne({
            courseid: req.body.courseid,
            assignmentid: req.body.assignmentid,
            studentemail: req.body.email,
            filepath: (req.file || {}).path || "",
            submissionid: uuid.v1()
          })
            .then((row2) => {
              console.log("row1", row2);
              console.log("row1[0]", row2[0]);
              req.body.filepath = req.file.path;
              console.log(req.body);
              cb(null, req.body);
            }, (err) => {
              cb(true,null);
            })
        }
      }, (err) => {
        cb(true,null);
      })
  })
};

module.exports = controller;