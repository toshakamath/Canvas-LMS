var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");

controller.studentDisplayCourses = function (req, res) {
  singletonDb.getInstance().then(db=>{
    db.collection('enrollment').find({
      email:req.body.email,
      enrollmentstatus:"enrolled"
    })
    .toArray()
    .then((row)=>{
      console.log("date sent back: ", row);   //the courses from enrollment table that the user has enrolled in
      //console.log("enrollment stat ", row[0].enrollmentstatus);  //enrolled
      //if(row[0].enrollmentstatus='enrolled'){   //if user is enrolled
      console.log("student enrolled");
      db.collection('coursedetails').find({})
      .toArray()
      .then((row1)=>{
        var a = [];
          for (var i = 0; i < row.length; i++) {
            for (var j = 0; j < row1.length; j++) {
              if (row[i].courseid === row1[j].courseid) {
                console.log(row1[j]);
                a.push(row1[j]);
              }
            }
          }
          console.log("a: ", a);
          res.status(200).send(a);
      }, (err)=>{
        res.status(400);
      })
    },(err)=>{
      res.status(400);
    })
  })
};

controller.teacherDisplayCourses = function (req, res) {
  singletonDb.getInstance().then(db=>{
    db.collection('coursedetails').find({
      courseid:req.body.courseid
    })
    .toArray()
    .then((row)=>{
      console.log("date sent back: ", row);
      res.status(200).send(row);
    }, (err)=>{
      res.status(400);
    })
  })
};

controller.dropCourse = function (req, res) {
  singletonDb.getInstance().then(db=>{
    db.collection('enrollment').deleteOne({
      courseid:req.body.courseid,
      email: req.body.email
    })
    .then((row)=>{
      console.log("row: ", row);
      db.collection('coursedetails').findOneAndUpdate({
        courseid:req.body.courseid
      },{
        $set: {
          currentcapacity:currentcapacity+1
        }
      })
      .then((row1)=>{
        res.status(200).send(row1);
      }, (err)=>{
        res.status(400);
      })
    }, (err)=>{
      console.log("error");
      res.status(400);
    })
  })
};

controller.createCourse = function (req, res) {
  singletonDb.getInstance().then(db=>{
    db.collection('userdetails').find({
      email:req.body.em
    })
    .toArray()
    .then((row)=>{
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        res.status(400);
      } else {
        db.collection('coursedetails').insertOne({
          email:req.body.em,
          courseid:req.body.courseID,
          coursename:req.body.courseName,
          coursedept:req.body.courseDept,
          coursedesc:req.body.courseDesc,
          courseroom:req.body.courseRoom,
          coursecapacity:req.body.courseCapacity,
          waitlistcapacity:req.body.waitlistCapacity,
          courseterm:req.body.courseTerm,
          currentcapacity:req.body.courseCapacity,
          currentwaitlistcapacity:req.body.waitlistCapacity
        })
        .then((row1)=>{
          res.status(200).send(row1);
        },(err)=>{
          res.status(400);
        })
      }
    },(err)=>{
      res.status(400);
    })
  })
};

controller.displayCourse = function (req, res) {
  console.log("Inside display course");
  console.log("email: ", req.body.email);
  singletonDb.getInstance().then(db=>{
    db.collection('coursedetails').find({
      email:req.body.email
    })
    .toArray()
    .then((row)=>{
      res.status(200).send(row);
    }, (err)=>{
      res.status(400);
    })
  })
};

module.exports = controller;
