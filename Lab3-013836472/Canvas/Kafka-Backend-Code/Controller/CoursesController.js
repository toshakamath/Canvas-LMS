var mysql = require("mysql");
// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "canvas_db"
// });

var controller = {}
var singletonDb = require("../Connection");

controller.studentDisplayCourses = function (req, cb) {
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
          cb(null, a);
      }, (err)=>{
        cb(true,null);
      })
    },(err)=>{
      cb(true,null);
    })
  })
};

controller.teacherDisplayCourses = function (req, cb) {
  singletonDb.getInstance().then(db=>{
    db.collection('coursedetails').find({
      courseid:req.body.courseid
    })
    .toArray()
    .then((row)=>{
      console.log("date sent back: ", row);
      cb(null, row);
    }, (err)=>{
      cb(true,null);
    })
  })
};

controller.dropCourse = function (req, cb) {
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
        cb(null, row1);
      }, (err)=>{
        cb(true,null);
      })
    }, (err)=>{
      console.log("error");
      cb(true,null);
    })
  })
};

controller.createCourse = function (req, cb) {
  singletonDb.getInstance().then(db=>{
    db.collection('userdetails').find({
      email:req.body.em
    })
    .toArray()
    .then((row)=>{
      console.log("rows: " + row.length);
      if (!row.length) {
        console.log("Teacher is not present. Please sign up.");
        cb(true,null);
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
          cb(null, row1);
        },(err)=>{
          cb(true,null);
        })
      }
    },(err)=>{
      cb(true,null);
    })
  })
};

controller.displayCourse = function (req, cb) {
  console.log("Inside display course");
  console.log("email: ", req.body.email);
  singletonDb.getInstance().then(db=>{
    db.collection('coursedetails').find({
      email:req.body.email
    })
    .toArray()
    .then((row)=>{
      cb(null, row);
    }, (err)=>{
      cb(true,null);
    })
  })
};

module.exports = controller;
